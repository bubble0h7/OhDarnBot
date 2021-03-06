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
                        , try: [">help config setup"] 
                        , parameters: ["None"]
                        , example: [">config setup"]
                    };
                break;
                    
                case "botchannel":
                    embedDetails = {
                          title: ">config botchannel"
                        , description: "This command will check for a bot text channel and create the channel if one doesn't already exist." 
                        , try: [">help config botchannel"]
                        , parameters: ["None"]
                        , example: [">config botchannel"]
                    };
                break;

                case "embedcolour":
                case "embedcolor":
                    embedDetails = {
                          title: ">config embedcolour / >config embedcolour"
                        , description: "This command sets what embed colour the bot uses for your server." 
                        , try: [">help config embedcolour", ">help config embedcolour"]
                        , parameters: ["Hex Colour"]
                        , example: [">config embedcolour #e74999", ">config embedcolor #e74999"]
                    };
                break;

                default:
                    embedDetails = {
                          title: ">config"
                        , description: "These commands are designed to help with the configuration of your Oh Darn Bot." 
                        , try: [">help config setup", ">help config botchannel", ">help config embedcolor", ">help config embedcolour"]
                        , parameters: ["Yes"]
                        , example: [">config setup",">config botchannel",">config embedcolor #e74999",">config embedcolour #e74999"]
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
        case "champ":
            switch (arg2) {
                case "top":
                    embedDetails = {
                          title: ">champ top"
                        , description: "This command will fetch you a random top champion from League of Legends." 
                        , try: [">help champ top"]
                        , parameters: ["None"]
                        , example: [">champ top"]
                    };
                break;
                case "jungle":
                case "jun":
                case "jg":
                    embedDetails = {
                          title: ">champ jungle / >champ jun / >chammp jg"
                        , description: "This command will fetch you a random jungle champion from League of Legends." 
                        , try: [">help champ jungle", ">help champ jun", ">help champ jg"]
                        , parameters: ["None"]
                        , example: [">champ jungle", ">champ jun", ">champ jg"]
                    };
                break;
                case "mid":
                    embedDetails = {
                          title: ">champ mid"
                        , description: "This command will fetch you a random mid champion from League of Legends." 
                        , try: [">help champ mid"]
                        , parameters: ["None"]
                        , example: [">champ mid"]
                    };
                break;
                case "adc":
                    embedDetails = {
                          title: ">champ adc"
                        , description: "This command will fetch you a random adc champion from League of Legends." 
                        , try: [">help champ adc"]
                        , parameters: ["None"]
                        , example: [">champ adc"]
                    };
                break;
                case "sup":
                case "support":
                    embedDetails = {
                          title: ">champ sup / >champ support"
                        , description: "This command will fetch you a support champion from League of Legends." 
                        , try: [">help champ sup", ">help champ support"]
                        , parameters: ["None"]
                        , example: [">champ sup", ">champ support"]
                    };
                break;
                case "random":
                case "ran":
                    embedDetails = {
                          title: ">champ random / >champ ran"
                        , description: "This command will fetch you a random champion from League of Legends." 
                        , try: [">help champ random", ">help champ ran"]
                        , parameters: ["None"]
                        , example: [">champ random", ">champ ran"]
                    };
                break;
                default:
                    embedDetails = {
                            title: ">champ"
                        , description: "This can be used to fetch League of Legends champions by name. Alternatively, use the random parameter to get a random champion's details." 
                        , try: [">help champ random", ">help champ ran"]
                        , parameters: ["Champion name OR random"]
                        , example: [">champ annie", ">champ random", ">champ ran"]
                    };
            }
            break;
    default:
        embedDetails = {
              title: ">help"
            , description: "What do you need help with?" 
            , try: [">help config", ">help config setup", ">help config botchannel", ">help config embedcolor", ">help config embedcolour",  ">help roll", ">help champ random", ">help champ ran", ">help champ top", ">help champ jg", ">help champ jun", ">help champ jungle", ">help champ mid", ">help champ adc", ">help champ sup", ">help champ support"]
            , parameters: ["Yes"]
            , example: [">help config", ">help config setup", ">help config botchannel", ">help config embedcolor", ">help config embedcolour", ">help roll", ">help champ random", ">help champ ran", ">help champ top", ">help champ jg", ">help champ jun", ">help champ jungle", ">help champ mid", ">help champ adc", ">help champ sup", ">help champ support"]
        };
    }
    
    return embedDetails;
};