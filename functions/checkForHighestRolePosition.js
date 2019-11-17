module.exports = function (guild) {
    var roles = guild.roles;
    var highestRolePosition = 1;
    for (var [id, role] of roles) {
        if (role.position > highestRolePosition) {
            highestRolePosition = role.position;
        }
    }
    return highestRolePosition;
}