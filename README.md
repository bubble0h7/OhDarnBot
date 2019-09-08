# OhDarnBot
A Discord bot developed specifically for the [Oh Darn Discord](https://discord.gg/vceNhvR).
Expansion to other servers has been kept in mind for if that ever becomes a point of interest.

This project serves two purposes: 
- to further my programming skills and knowledge of Node.JS
- to reduce and replace the often-failing bots we used to rely on

## Setup
### Invite Oh Darn Bot to your Discord
You'll need admin permissions in a server to invite the bot. During development, the invite link for this bot will be kept under wraps. Feel free to get in touch if you're interested in using the bot during this time.
### Update Oh Darn Bot's Role
Make sure the bot's role is at the top of your server's [role hierarchy](https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101).
This is important for the functionality of the bot.
### Run setup command
Type `>config setup` in any text channel in your Discord Server. This will update any streaming members' roles to 'Currently Streaming'.

## Features
This bot's features will likely end up being focused around general purpose and moderating, with the odd League of Legends commands.
- [x] Dice rolling
- [x] Random League Champion Generation
- [x] Automatic new guild members role
- [x] Currently Streaming Role Management
- [ ] Random League of Legends team with rerolling via reactions
- [ ] Giveaways
- [ ] Strawpolls
- [ ] Moderation tools
- [ ] Extensive bot customisation

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

#### >config botchannel
Checks for an 'ohdarn-bot' text channel, and creates the channel if one doesn't already exist.

**Parameters:** none  **|  Example:** `>config botchannel`

### >help
For more information on a command.

**Parameters:** command  **|  Example:** `>help config setup`



## General Development TODOs
- [x] Create automatic 'EVERYONE' role assignment on guild join
- [ ] Create embeded introductory message for on guild join
- [ ] Refactor 'checkIfXExists' functions
- [ ] Implement lodash to make the 'presenceUpdate' event less gross
- [ ] Break commands up into folders/seperate files
- [ ] Give the option to configure/customise the bot
- [x] Database to store each guild's config
- <s>[ ] Setup VPS to run bot as a service</s>
- [x] Setup bot to use [deploys.io](https://deploys.io/)

