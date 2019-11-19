module.exports = function (message, name, title, description, tags, roles) {
    const discord = require("discord.js");
    const api = require('../database/api.js');

    var callback = function(response) {
        var lolchampEmbed = new discord.RichEmbed()
        .setColor('#' + response.embed_colour)
        .setTitle(name + " - " + title)
        .setURL('https://na.leagueoflegends.com/en/game-info/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/')
        .setDescription(description)
        .setThumbnail('https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/' + name + '.png')
        .addField('Classes', tags, true)
        .addField('Roles', roles, true)
        .addField('Builds', ['https://app.mobalytics.gg/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/build','https://champion.gg/champion/' + name.toLowerCase().replace(' ', '').replace("'", ""),'https://u.gg/lol/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/build'])
        .setTimestamp()
        .setFooter('OhDarnBot');
        
        message.channel.send(lolchampEmbed);
    }
    var response = api.get(message.guild.id, "embed_colour", callback);
};
