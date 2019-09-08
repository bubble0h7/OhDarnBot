module.exports = function (guildId, column, value) {
    //database connecation
    const connection = require('./database/connection.js');

    var sql = "UPDATE guilds SET " + column + " = '" + value + "' WHERE id = '" + guildId + "';";

    connection.query(sql, function (err) {
        if (err) throw err;
        console.log("Successfully updated " + column + " with " + value);
        return true;
    })

};