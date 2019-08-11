/*jshint esversion: 6 */

//require config file
const configFileName = "./config.json";
const config = require(configFileName);
//require discord.js commando library 
const discord = require("discord.js");

//require getJSON
const getJSON = require('get-json');
//set url for league champions json file
const leagueChampsUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";


//d&i bot as object
const bot = new discord.Client();

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
}

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
            .setColor('#c9aa71')
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
                let arg = args[0];
                if (arg  == "lolchamp" || arg == "champ") {
                       getRandomLeagueChamp(message);
                } else {
                    console.log("Invalid arg: " + arg);
                };
            break;
        }
    };
});

//login to account using bot token in config file
bot.login(config.token);