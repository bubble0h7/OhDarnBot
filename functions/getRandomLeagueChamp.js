module.exports = function (message) {
    const fs = require('fs');
    const leagueChampsFile = "./champions.json";
    const sendLeagueChampionEmbed = require('./sendLeagueChampionEmbed.js');
    
    var rawdata = fs.readFileSync(leagueChampsFile);
    var champs = JSON.parse(rawdata);
    var count = Object.keys(champs.data).length;
    
    if (count > 0) {
        var randomNumber = Math.floor((Math.random() * count) + 1) -1;
        var champ = Object.values(champs.data);
        var champ = champ[randomNumber];
        var name = champ.name;
        var title = champ.title;
        var description = champ.blurb.replace('<br><br>','');
        var tags = champ.tags;
        var roles = champ.roles;
        sendLeagueChampionEmbed(message, name, title, description, tags, roles);
    } else {
        message.channel.send("Could not find any League Champions.");
    }
};