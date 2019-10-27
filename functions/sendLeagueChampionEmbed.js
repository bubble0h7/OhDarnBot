module.exports = function (message, name, title, description, tags, roles) {
    const discord = require("discord.js");
    
    var lolchampEmbed = new discord.RichEmbed()
    .setColor('#e74999')
    .setTitle(name + " - " + title)
    .setURL('https://na.leagueoflegends.com/en/game-info/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/')
    .setDescription(description)
    .setThumbnail('https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/' + name + '.png')
    .addField('Classes', tags, true)
    .addField('Roles', roles, true)
    .addField('Builds', ['https://app.mobalytics.gg/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/build','https://champion.gg/champion/' + name.toLowerCase().replace(' ', '').replace("'", ""),'https://u.gg/lol/champions/' + name.toLowerCase().replace(' ', '').replace("'", "") + '/build'])
    .setTimestamp()
    .setFooter('OhDarnBot');
    
    message.channel.send(lolchampEmbed);
};
