const { MessageEmbed } = require("discord.js")
const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")

module.exports.change_status = change_status

/**
 * @param {*} client 
 */
async function change_status(client) {

    try {

        client.user.setActivity({ status: "online", name: `Activities`, type: "PLAYING"})

        // Change the Name if you want

    } catch (e) {
        console.log(e)
    }
}