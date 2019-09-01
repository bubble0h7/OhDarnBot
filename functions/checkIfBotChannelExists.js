module.exports = function (channels) { 
    for (var [id, channel] of channels) {
        if (channel.name == "ohdarn-bot" && channel.type == "text") {
            return channel.id;
        }
    }
}