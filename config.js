module.exports = function (args, message) { 
    
    var checkIfBotChannelExists = require('./functions/checkIfBotChannelExists.js');
    var giveMemberStreamingRole = require('./functions/giveMemberStreamingRole.js');

    //require config file
    const configFileName = "./config.json";
    const configFile = require(configFileName);
    
    //require discord.js commando library 
    const discord = require("discord.js");

    //commands
    const help = require('./help.js');
    
    //database 
    const api = require('./database/api.js');

    let arg1 = args[0];
    let arg2 = args[1];
    var guild = message.guild;
    var guildMembers = guild.members;

    switch (arg1) {

        case "setup":
            var updatedSomeonesRole = false;
            for (var [id, guildMember] of guildMembers) {
                if (guildMember.presence.game) {
                    if (guildMember.presence.game.streaming === true) {
                        giveMemberStreamingRole(guildMember, guild);
                        message.channel.send(guildMember + " is streaming. Updated their role.");
                        updatedSomeonesRole = true;
                    }
                }
            };
            if (updatedSomeonesRole === false) {
                message.channel.send("No one seems to be streaming right now.");
            };
        break;
                    
        case "botchannel":
            var channels = message.guild.channels;
            var botChannelID = checkIfBotChannelExists(channels);
            if (botChannelID) {
                message.reply("you already have a bot channel for me: " + message.guild.channels.get(botChannelID).toString());
            } else {
                message.guild.createChannel('ohdarn-bot', { type: 'text' })
                .then(function() {
                        var updatedChannels = message.guild.channels;
                        var newBotChannelID = checkIfBotChannelExists(updatedChannels);
                        if (newBotChannelID) {
                            //message.guild.channels.find(newBotChannel => newBotChannel.id === newBotChannelID).reply("I made myself a bot channel. I hope that's okay! Feel free to move it where ever you like.");
                            message.guild.channels.get(newBotChannelID).send(message.author.toString() + " I made myself a bot channel. I hope that's okay! Feel free to move it where ever you like.");
                        } else {
                            console.log("Failed to find new bot channel");
                        }
                    })
                .catch(console.error);
            }
        break;

        case "embedcolor":
        case "embedcolour":
        //Validate hex code
            if (arg2.startsWith("#") && arg2.length == 7 && arg2.substr(1).match("^[A-z0-9]+$")){
                
                //Attempt to update database
                api.update(message.guild, "embed_colour", arg2.substr(1), message);

            } else {
                message.channel.send("Please enter a proper hex colour value. For example: #e74999");
            };
        break;

        default:
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
                var embedDetails = help(["config", ""]);
                sendEmbed(response, embedDetails);
            }

            var response = api.get(message.guild.id, "embed_colour", getEmbedDetails, sendEmbed);
    
        break;
    }                
};