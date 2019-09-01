module.exports = function (args) { 
    let arg1 = args[0];
    let arg2 = args[1];

    let embedDetails = {};

    switch (arg1) {
        case "config":
            switch (arg2) {

                case "setup":
                    embedDetails = {
                          title: ">config setup"
                        , description: "This command is designed to be run as a one off command when Oh Darn Bot is first added to your server. It will find any currently streaming members and update their role to 'Currently Streaming'." 
                        , parameters: ["None"]
                        , example: [">config setup"]
                    };
                break;
                    
                case "botchannel":
                    embedDetails = {
                          title: ">config botchannel"
                        , description: "This command will check for a bot text channel and create the channel if one doesn't already exist." 
                        , parameters: ["None"]
                        , example: [">config botchannel"]
                    };
                break;

                default:
                    embedDetails = {
                          title: ">config"
                        , description: "These commands are designed to help with the configuration of your Oh Darn Bot." 
                        , try: [">help config setup", ">help config botchannel"]
                        , parameters: ["Yes"]
                        , example: [">config setup",">config botchannel"]
                    };
            }
            break;
        case "roll":
            embedDetails = {
                  title: ">roll"
                , description: "Use this command to emulate rolling dice. It takes two parameters - Quantity and Dice; Quantity being how many dice you wish to roll, and Dice being what kind of dice/how many sided." 
                , try: ["d4, d6, d8, d10, d12, d20, d100"]
                , parameters: ["Quantity, Dice"]
                , example: [">roll 3 d8"]
            };
            break;
        case "random":
            switch (arg2) {
                case "lolchamp" || "champ":
                    embedDetails = {
                          title: ">random champ / >random lolchamp"
                        , description: "This command will fetch you a random champion from League of Legends." 
                        , try: [">help config setup", ">help config botchannel"]
                        , parameters: ["None"]
                        , example: [">random champ", ">random lolchamp"]
                    };
                    break;
                    default:
                        embedDetails = {
                              title: ">random"
                            , description: "These commands are random generators that may come in handy." 
                            , try: [">help random lolchamp", ">help random champ"]
                            , parameters: ["Yes"]
                            , example: [">random champ", ">random lolchamp"]
                        };
            }
            break;
    default:
        embedDetails = {
              title: ">help"
            , description: "What do you need help with?" 
            , try: [">help config", ">help config setup", ">help config botchannel", ">help roll", ">help random lolchamp", ">help random champ"]
            , parameters: ["Yes"]
            , example: [">help config", ">help config setup", ">help config botchannel", ">help roll", ">help random lolchamp", ">help random champ"]
        };
    }
    
    return embedDetails;
};