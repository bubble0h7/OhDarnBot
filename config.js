module.exports = function (args, message) { 
    
    const checkIfBotChannelExists = require('./functions/checkIfBotChannelExists.js');

    let arg1 = args[0];
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

        default:
            //TODO call help.config command here
        break;
    }                
};