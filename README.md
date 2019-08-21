# OhDarnBot
A general purpose Discord bot developed by bubble0h7

## Setup
### Invite Oh Darn Bot to your Discord
You'll need admin permissions in a server to invite the bot.
### Update Oh Darn Bot's Role
Make sure the bot's role is at the top of your server's [role hierarchy](https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101).
This is important for the functionality of the bot.
### Run setup command
Type `>config setup` in any text channel in your Discord Server. This will update any streaming members' roles to 'Currently Streaming'.

## Features
- [x] Dice rolling
- [x] Random League Champion Generation
- [ ] Set new guild members role (configurable default role)
- [x] Currently Streaming Role Management
- [ ] Random League of Legends team with rerolling via reactions
- [ ] Giveaways
- [ ] Strawpolls

## Commands
### >roll
Emulates rolling dice.

**Parameters:** quantity, dice  **|  Example:** `>roll 3 d6`


### >random
Random generators.
### >random champ OR >random lolchamp
Fetchs you a random champion from League of Legends.

**Parameters:** none  **|  Example:** `>random champ`


### >config
To help with the configuration of your Oh Darn Bot.
#### >config setup
Designed to be run as a one off command when Oh Darn Bot is first added to your server. It will find any currently streaming members and update their role to 'Currently Streaming'.

**Parameters:** none  **|  Example:** `>config setup`


### >help
For more information on a command.

**Parameters:** command  **|  Example:** `>help config setup`



## General Development TODOs
- [ ] Create embeded introducory message for on guild join
- [ ] Refactor 'checkIfXExists' functions
- [ ] Break commands up into folders/seperate files
- [ ] Give the option to configure/customise the bot
- [ ] Database to store each guild's config
- [ ] Setup VPS to run bot as a service

