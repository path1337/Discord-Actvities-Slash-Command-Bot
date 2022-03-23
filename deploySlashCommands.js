const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
const config = require("./botconfig/config.json")

const commands = []
readdirSync("./slashCommands/").map(async dir => {
	readdirSync(`./slashCommands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./slashCommands/${dir}/${cmd}`)))
    })
})

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing Slash Commands`);
		await rest.put(
			Routes.applicationCommands("BOT ID"), // Your Bot ID goes here
			{ body: commands },
		);
		console.log(`Successfully refreshed Slash Commands`);
	} catch (e) {
		console.log(e);
	}
})();