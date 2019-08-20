/*jshint esversion: 6 */

//require config file
const configFileName = "./config.json";
const config = require(configFileName);
//require discord.js commando library 
const discord = require("discord.js");

//require getJSON
const getJSON = require('get-json');
//set url for league champions json file
const leagueChampsUrl = "https://ddragon.leagueoflegends.com/cdn/9.16.1/data/en_US/champion.json";



//d&i bot as object
const bot = new discord.Client();

function rollDice (message, quantity, die) {
    console.log("Rolling " + quantity + die + "...");
    message.channel.send("Rolling " + quantity + die + "...");
    var result = 0;
    die = die.substr(1);
    for (i = 0; i < quantity; i++) {
        roll = Math.floor((Math.random() * die) + 1);
        console.log("Rolled: " + roll);
        message.channel.send("Rolled: " + roll);
        result = result + roll;
    }
    message.reply("You rolled: " + result);
};

function getRandomLeagueChamp (message) {
    console.log("Attempting to fetch 'League Champions' file...");
    getJSON(leagueChampsUrl).then(function(response) {
        console.log("Successfully retrieved 'League Champions' file.");
        var champs = response.data;
        var count = Object.keys(champs).length;
        console.log("Retrieved " + count + " champions.");
        if (count > 0) {
            var randomNumber = Math.floor((Math.random() * count) + 1) -1;
            console.log("Random champion number: " + randomNumber);
            var champ = Object.values(champs);
            console.log(champ[randomNumber]);
            var name = champ[randomNumber].name;
            var title = champ[randomNumber].title;
            var blurb = champ[randomNumber].blurb.replace('<br><br>','');
            var description = blurb;
            var tags = champ[randomNumber].tags;
            // league champion custome embed
            var lolchampEmbed = new discord.RichEmbed()
            .setColor('#e74999')
            .setTitle(name + " - " + title)
            .setURL('https://na.leagueoflegends.com/en/game-info/champions/' + name + '/')
            .setDescription(description)
            .setThumbnail('https://ddragon.leagueoflegends.com/cdn/9.15.1/img/champion/' + name + '.png')
            .addField('Classes', tags)
            .setTimestamp()
            .setFooter('OhDarnBot');
            message.channel.send(lolchampEmbed);
        } else {
            console.log("Retrieved " + Object.keys(champs).length + " champions.");
            message.channel.send("Could not find any League Champions.");
        }
      }).catch(function(error) {
        console.log(error);
        message.channel.send("Error occured fetching random League of Legends champ.");
      });
};


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
    //when bot has launched, log in console
    console.log("Bot (" + bot.user.username + ") launched...");
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
            console.log(link);
        }).catch(err => {
            console.log(err.stack);
    });
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
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        switch (command) {
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
            case "random":
                let thing = args[0];
                if (thing  == "lolchamp" || thing == "champ") {
                       getRandomLeagueChamp(message);
                } else {
                    console.log("Invalid arg: " + thing);
                };
            break;
            case "config":
                let setting = args[0];
                if (setting == "setup") {
                    var guild = message.guild;
                    var guildMembers = guild.members;
                    for (var [id, guildMember] of guildMembers) {
                        if (guildMember.presence.game) {
                            if (guildMember.presence.game.streaming === true) {
                                giveMemberStreamingRole(guildMember, guild);
                                message.send(guildMember + " is streaming. Updated their role.");
                            }
                        }
                    };
                }
            break;
            case "help":
            let command = args[0];
            let command2 = args[1];
            if (command == "config") {
                if (command2 == "setup") {
                    var setupEmbed = new discord.RichEmbed()
                    .setColor('#e74999')
                    .setTitle(">config setup")
                    .setDescription("This command is designed to be run as a one off command when Oh Darn Bot is first added to your server. It will find any currently streaming members and update their role to 'Currently Streaming'.")
                    .setTimestamp()
                    .setFooter('OhDarnBot');
                    message.channel.send(setupEmbed);
                } else if (command2 == null) {
                    var configEmbed = new discord.RichEmbed()
                    .setColor('#e74999')
                    .setTitle(">config")
                    .setDescription("These commands are designed to help with the configuration of your Oh Darn Bot.")
                    .addField("Try:", [">help config setup"])
                    .setTimestamp()
                    .setFooter('OhDarnBot');
                    message.channel.send(configEmbed);
                }
            } else if (command == "roll") {
                var rollEmbed = new discord.RichEmbed()
                .setColor('#e74999')
                .setTitle(">roll")
                .setDescription("Use this command to emulate rolling dice. It takes two parameters - Quantity and Dice; Quantity being how many dice you wish to roll, and Dice being what kind of dice/how many sided.")
                .addField("Parameters:", [">roll quantity dice"])
                .addField("Example:", [">roll 3 d8"])
                .addField("Avaliable Dice:", ["d4", "d6", "d8", "d10", "d12", "d20", "d100"])
                .setTimestamp()
                .setFooter('OhDarnBot');
                message.channel.send(rollEmbed);
            } else if (command == "random") {
                if (command2 == "lolchamp" || command2 == "champ") {
                    var champEmbed = new discord.RichEmbed()
                    .setColor('#e74999')
                    .setTitle(">random champ / >random lolchamp")
                    .setDescription("This command will fetch you a random champion from League of Legends.")
                    .setTimestamp()
                    .setFooter('OhDarnBot');
                    message.channel.send(champEmbed);
                } else if (command2 == null) {
                    var randomEmbed = new discord.RichEmbed()
                    .setColor('#e74999')
                    .setTitle(">random")
                    .setDescription("These commands are random generators that may come in handy.")
                    .addField("Try:", [">help random lolchamp", ">help random champ"])
                    .setTimestamp()
                    .setFooter('OhDarnBot');
                    message.channel.send(randomEmbed);
                }
            }
            break;
        }
    };
});


bot.on('presenceUpdate', (oldMember, newMember) => {
    let guild = newMember.guild;
    if (newMember.presence.game) {
        if (newMember.presence.game.streaming === true) { //change this back to true
            if (oldMember.presence.game) {
                if (oldMember.presence.game.streaming === false) {
                    giveMemberStreamingRole(newMember, guild);
                }
            }
        } else if (oldMember.presence.game) {
            if (oldMember.presence.game.streaming === true) {
                oldMember.removeRole("name", "Currently Streaming");
                console.log(oldMember.displayName + "stopped streaming");
            }
        }
    } else if (oldMember.presence.game) {
        if (oldMember.presence.game.streaming === true) {
            oldMember.removeRole("name", "Currently Streaming");
            console.log(oldMember.displayName + "stopped streaming");
        }
    }
});

// Triggers when the bot joins a server
bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
});

//Trigger when the bot is removed from a server
bot.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
});

//login to account using bot token in config file
bot.login(config.token);