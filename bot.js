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
});

//login to account using bot token in config file
bot.login(config.token);

