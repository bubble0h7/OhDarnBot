module.exports = function (args, message) { 
    
    //require discord.js commando library 
    const discord = require("discord.js");
    //require fs 
    const fs = require('fs');

    //commands
    const help = require('./help.js');
    
    //database 
    const api = require('./database/api.js');

    //champion file and special embed function
    const leagueChampsFile = "./champions.json";
    const sendLeagueChampionEmbed = require('./functions/sendLeagueChampionEmbed.js');

    //common variables
    var rawdata = fs.readFileSync(leagueChampsFile);
    var champs = JSON.parse(rawdata);
    champs = Object.values(champs.data);
    var champCount = champs.length;

    let arg1 = args[0];
    let arg2 = args[1];

    if(arg1) {
        switch (arg1) {
                        
            case "top":
                // Fetch champ with top role
            break;

            case "jungle":
            case "jun":
            case "jg":
                // Fetch champ with jungle role
            break;

            case "mid":
                // Fetch champ with mid role
            break;

            case "adc":
                // Fetch champ with adc role
            break;

            case "sup":
            case "support":
                // Fetch champ with sup role
            break;

            case "ran":
            case "random":
                
                if (champCount > 0) {
                    var randomNumber = Math.floor((Math.random() * champCount) + 1) -1;
                    
                    var champRandom = champs[randomNumber];
                    var name = champRandom.name;
                    var title = champRandom.title;
                    var description = champRandom.blurb.replace('<br><br>','');
                    var tags = champRandom.tags;
                    var roles = champRandom.roles;
                    sendLeagueChampionEmbed(message, name, title, description, tags, roles);
                } else {
                    message.channel.send("Could not find any League Champions.");
                }

            break;

            default:

                if (arg1) {
                    // Try to find champ by name
                    if (champCount > 0) {
                        var champName = arg1;
                        var found = false;
                        var foundChamp = null;
                        champs.forEach(function(champ) {
                            if (champ.name.toLowerCase() == champName) {
                                foundChamp = champ;
                                found = true;
                            }
                        });
                        if (found && foundChamp != null) {
                            // TODO: champ should probably just be passed into the embed sender?
                            var name = foundChamp.name;
                            var title = foundChamp.title;
                            var description = foundChamp.blurb.replace('<br><br>','');
                            var tags = foundChamp.tags;
                            var roles = foundChamp.roles;
                            sendLeagueChampionEmbed(message, name, title, description, tags, roles);
                        } else {
                            message.channel.send("Unable to find champion.");
                        }
                    } else {
                        message.channel.send("Could not find any League Champions.");
                    }
                    
                } else {
                    /* var sendEmbed = function (response, embedDetails) {
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

                    var response = api.get(message.guild.id, "embed_colour", getEmbedDetails, sendEmbed); */
                }
                
            break;
        }
    } else {
        /* var sendEmbed = function (response, embedDetails) {
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

        var response = api.get(message.guild.id, "embed_colour", getEmbedDetails, sendEmbed); */
    }                
};