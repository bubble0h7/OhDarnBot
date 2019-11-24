/*jshint esversion: 6 */
'use strict';

//require config file
const configFileName = "./config.json";
const configFile = require(configFileName);

//require discord.js commando library 
const discord = require("discord.js");

//database 
const api = require('./database/api.js');

//commands
const help = require('./help.js');
const config = require('./config.js');
const champ = require('./champ.js');

//functions
const checkIfBotChannelExists = require('./functions/checkIfBotChannelExists.js');
const rollDice = require('./functions/rollDice.js');
const getRandomLeagueChamp = require('./functions/getRandomLeagueChamp.js');

//d&i bot as object
const bot = new discord.Client();


function checkForHighestRolePosition (guild) {
    var roles = guild.roles;
    var highestRolePosition = 1;
    for (var [id, role] of roles) {
        if (role.position > highestRolePosition) {
            highestRolePosition = role.position;
        }
    }
    return highestRolePosition;
};

function checkIfRoleExists (guild, roleName) {
    var roles = guild.roles;
    for (var [id, role] of roles) {
        if (role.name == roleName) {
            return role.id;
        }
    }
    return;
};

function giveMemberStreamingRole (member, guild) {
    var highestRolePosition = checkForHighestRolePosition(guild);
    var roleID = checkIfRoleExists(guild, "Currently Streaming");
    if (roleID) {
        member.addRole(roleID);
        console.log(member.displayName + " started streaming");
    } else {
        // Create a new role with data
        guild.createRole({
            name: "Currently Streaming",
            color: "#6441a4",
            hoist: true,
            position: highestRolePosition - 1
        })
        .then(role => {
            console.log(`Created new role with name ${role.name} and position: ${role.position}`);
            member.addRole(role);
            console.log(member.displayName + " started streaming");
        }).catch(console.error);
    }
};

bot.on("ready", () => {
    //connect to db
    api.testConnection(function(err) {
        if (err) throw err;
        console.log("Connected to database!");
      });
    //when bot has launched, log in console
    console.log("Bot (" + bot.user.username + ") launched...");
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
            console.log(link);
        }).catch(err => {
            console.log(err.stack);
    });
    bot.user.setActivity('with v1.2.4 (STABLE?)', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

//checks content of messages and responses appropriately
bot.on("message", message => {
    //if message was posted by bot, ignore
    if(message.author.bot) return;
    //if message is in the form of a direct message, reply within that thread? or ignore? can't remember..
    if(message.channel.type === "dm") return;
    //if message is ping, reply pong (for checking connectivity)
    if(message.content == "ping") {
        message.channel.send("pong");
    };
    if (message.content.startsWith(configFile.prefix)) {
        const args = message.content.slice(configFile.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        switch (command) {
            case "temp":
                //
            break;
            case "roll":
                let quantity = args[0];
                let die = args[1];
                console.log(die);
                if ((quantity ) && (die != null)) {
                    die = die.toLowerCase();
                    if (!isNaN(quantity)) {
                        if (die == "d4" || die == "d6" || die == "d8" || die == "d10" || die == "d12" || die == "d20" || die == "d100") {
                            rollDice(message, quantity, die);
                            break;
                        } else {
                            message.reply("Invalid die. Options: d4, d6, d8, d10, d12, d20, d100");
                            break;
                        }
                    } else {
                        message.reply("Amount must be a number. E.G. >roll {amount} {die} / >roll 2 d10");
                        break;
                    }
                } else {
                    message.reply("For help using the roll command, try >help roll");
                    break;
                }
            case "champ":

                champ(args, message);

            break;
            case "config":

                config(args, message);

            break;
            case "help":

                var sendEmbed = function (response, embedDetails) {
                    var helpEmbed = new discord.RichEmbed()
                    .setColor('#' + response.embed_colour)
                    .setTitle(embedDetails.title)
                    .setDescription(embedDetails.description)
                    .addField("Try:", embedDetails.try)
                    .addField("Parameters:", embedDetails.parameters)
                    .addField("Example:", embedDetails.example)
                    .setTimestamp()
                    .setFooter('OhDarnBot');
                    message.channel.send(helpEmbed);
                }

                function getEmbedDetails(response, sendEmbed) {
                    var embedDetails = help(args);
                    sendEmbed(response, embedDetails);
                }

                var response = api.get(message.guild.id, "embed_colour", getEmbedDetails, sendEmbed);
            
            break;
        }
    };
});


bot.on('presenceUpdate', (oldMember, newMember) => {
    var guild = newMember.guild;
    try {
        if (newMember.presence.game.streaming) {
            giveMemberStreamingRole(newMember, guild);
        } else {
            if(oldMember.presence.game.streaming) {
                console.log(oldMember.displayName + " stopped streaming");
                var roleID = checkIfRoleExists(guild, "Currently Streaming");
                oldMember.removeRole(roleID);
            }
        }
    } catch (e) {
        var roleID = checkIfRoleExists(guild, "Currently Streaming");
        oldMember.removeRole(roleID);
    }
});

// Triggers when the bot joins a server
bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    api.insert(guild, "id, embed_colour", guild.id + "', 'e74999");
    var channels = guild.channels;
    var botChannelID = checkIfBotChannelExists(channels);
    if (botChannelID) {
        guild.channels.get(botChannelID).send("Oh hey, look at this sweet bot channel you already have for me. Thanks!");
    } else {
        guild.createChannel('ohdarn-bot', { type: 'text' })
        .then(function() {
                var updatedChannels = guild.channels;
                var newBotChannelID = checkIfBotChannelExists(updatedChannels);
                if (newBotChannelID) {
                    //message.guild.channels.find(newBotChannel => newBotChannel.id === newBotChannelID).reply("I made myself a bot channel. I hope that's okay! Feel free to move it where ever you like.");
                    guild.channels.get(newBotChannelID).send("Hiya! I made myself a bot channel. Feel free to delete it or move it where ever you like.");
                } else {
                    console.log("Failed to find new bot channel");
                }
            })
        .catch(console.error);
    }
});

bot.on("guildMemberAdd", member => {
    var defaultRole = member.guild.roles.find(x => x.name === "EVERYONE");
    if (defaultRole) {
        member.addRole(defaultRole);
        console.log("New guild member (" + member.displayName + ") joined the server. Assigned them the 'EVERYONE' role!");
    } else {
        console.log("New guild member (" + member.displayName + ") joined the server. Unable to assign 'EVERYONE' role!");
    }
});

//Trigger when the bot is removed from a server
bot.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

//login to account using bot token in config file
bot.login(configFile.token);