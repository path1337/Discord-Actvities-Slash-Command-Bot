const { change_status } = require("../../handler/functions")

module.exports = async (client) => {
    console.log(`Logged in as: ${client.user.tag}`) // Log Succesful login

    change_status(client)

    setInterval(() => {
        change_status(client)
    }, 15000) // 15 Seconds | Change it but in ms !
}