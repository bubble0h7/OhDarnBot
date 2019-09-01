module.exports = function (message, quantity, die) { 
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