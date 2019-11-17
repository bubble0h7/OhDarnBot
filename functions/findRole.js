module.exports = function (guild, roleName) {

    return guild.roles.find(x => x.name === roleName);
    
}