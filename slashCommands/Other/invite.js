const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")

module.exports = {
    name: "invite",
    description: "Invite me!",
    run: async(interaction, client) => {
        try {

            interaction.reply({ content: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2181153793&scope=bot%20applications.commands`})


        } catch (e) {
            console.log(e)
            await interaction.reply({ content: ":x: Something went wrong, try Again!", ephemeral: true })
        }
    }
}
