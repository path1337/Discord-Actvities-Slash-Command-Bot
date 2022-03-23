const { MessageEmbed } = require("discord.js")

module.exports = async (client, interaction) => {

    if(interaction.isCommand()) {
        if(!client.slashCommands.has(interaction.commandName)) return;
        if(!interaction.guild) return;

        const command = client.slashCommands.get(interaction.commandName)

        try {
            command.run(interaction, client) // run interaction
        } catch (e) {
            console.log(e)
            await interaction.reply({ content: `:x: There was an Error, please try again!`, ephemeral: true})
        }

    }
}