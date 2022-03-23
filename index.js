const Discord = require("discord.js")
const config = require("./botconfig/config.json")
const client = new Discord.Client({
    shards: "auto",
    partials: ["CHANNEL", "MESSAGE"],
    intents: [
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.slashCommands = new Discord.Collection();


["events", "slashCommands", "antiCrash"].filter(Boolean)
.forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

client.login(config.token)
