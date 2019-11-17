const mysql = require('mysql');

var api = {
    connection : function () {
        //require config file
        var configFileName = "../config.json";
        var configFile = require(configFileName);

        var con = mysql.createConnection({
            host: configFile.host,
            port: configFile.port,
            database: configFile.database,
            user: configFile.user,
            password: configFile.password
        });

        return con;
    },

    testConnection : function () {
        
        //get db connection
        var con = api.connection();

        //test database connection
        con.connect(function(err) {
            if (err) throw err;
            console.log("Successfully connected to database!");
        });

    },

    get : function (guildId, column, callback, anotherCallback) {

        //get db connection
        var con = api.connection();

        //set query
        var sql = "SELECT `" + column + "` FROM guilds WHERE id='" + guildId + "' LIMIT 1;";

        //attempt to execute query
        con.connect(function(err) {
            if (err) throw err;
            console.log ("Connecting to database...");
            con.query(sql, function (err, result, fields) {
                console.log ("Sending query...");
                if (err) {
                    console.log("Encountered an error. Aborting!");
                    return callback(err);
                } else {
                    console.log("Successfully fetched " + column + " from database.");
                    callback(result[0], anotherCallback);
                }
            });
        });

    },

    update : function (guild, column, value, message) {
        
        //get db connection
        var con = api.connection();

        //set query
        var sql = "UPDATE guilds SET " + column + " = '" +  value + "' WHERE id = '" + guild.id + "';";

        //attempt to execute query
        con.connect(function(err) {
            if (err) throw err;
            con.query(sql, function (err) {
                if (err) {
                    if (message) {
                        message.channel.send("Sorry, there was an issue updating the database!");
                    }
                    throw err;
                } else {
                    if (message) {
                        console.log("Set " + column + " to " + value + " for guild: " + guild.name);
                        message.channel.send("Successfully set " + column + " to " + value + "!");
                    }
                    return;
                }
            });
        });

    },

    insert : function (guild, column, value) {
        
        //get db connection
        var con = api.connection();

        //set query
        var sql = "INSERT INTO guilds (" + column + ") VALUES('" +  value + "');";

        //attempt to execute query
        con.connect(function(err) {
            if (err) throw err;
            con.query(sql, function (err) {
                if (err) 
                throw err;
                console.log("Inserted " + value + " into " + column + " for guild: " + guild.name);
                return;
            });
        });

    }
};
module.exports = api;