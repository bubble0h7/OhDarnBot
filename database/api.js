var api = {
    connect : function () {
        //require config file
        var configFileName = "../config.json";
        var configFile = require(configFileName);

        var mysql = require('mysql');

        return con = mysql.createConnection({
            host: configFile.host,
            port: configFile.port,
            database: configFile.database,
            user: configFile.user,
            password: configFile.password
        });
    },

    get : function (guildId, column) {

        //connect to db
        var con = api.connect();

        //set query
        var sql = "SELECT " + column + " FROM guilds WHERE id='" + guildId + "';";

        //attempt to execute query
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Successfully fetched " + column + " from database.");
            return result;
        });

    },

    update : function (guildId, column, value, message) {
        
        //connect to db
        var con = api.connect();

        //set query
        var sql = "UPDATE guilds SET " + column + " = '" + value + "' WHERE id = '" + guildId + "';";

        //attempt to execute query
        con.query(sql, function (err) {
            if (err) {
                message.channel.send("Sorry, there was an issue updating the database!");
                throw err;
            } else {
                message.channel.send("Successfully set " + column + " to " + value + "!");
                return;
            }
        });

    }
};
module.exports = api;