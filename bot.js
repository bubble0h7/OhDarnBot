/*jshint esversion: 6 */

//require config file
const config = require("./config.json");
//require discord.js commando library 
const discord = require("discord.js");
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
    message.channel.sendMessage("Rolling " + quantity + die + "...");
    var result = 0;
    die = die.substr(1);
    for (i = 0; i < quantity; i++) {
        roll = Math.floor((Math.random() * die) + 1);
        console.log("Rolled: " + roll);
        message.channel.sendMessage("Rolled: " + roll);
        result = result + roll;
    }
    message.reply("You rolled: " + result);
}

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
        }
    };
});

//login to account using bot token in config file
bot.login(config.token);