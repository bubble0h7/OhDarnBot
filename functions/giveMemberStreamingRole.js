module.exports = function (member, guild) {
    var findRole = require('./findRole.js');
    var checkForHighestRolePosition = require('./checkForHighestRolePosition.js');

    var highestRolePosition = checkForHighestRolePosition(guild);
    var role = findRole(guild, "Currently Streaming");
    if (role) {
        member.addRole(role.id);
        console.log(member.displayName + " started streaming");
    } else {
        // Create a new role with data
        guild.createRole({
            name: "Currently Streaming",
            color: "#6441a4",
            hoist: true,
            position: highestRolePosition - 1
        })
        .then(role => {
            console.log(`Created new role with name ${role.name} and position: ${role.position}`);
            member.addRole(role);
            console.log(member.displayName + " started streaming");
        }).catch(console.error);
    }
}