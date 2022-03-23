const { readdirSync } = require("fs")

module.exports = async (client) => {

    readdirSync("./slashCommands").map(async (dir) => {
        readdirSync(`./slashCommands/${dir}`).map(async (cmd) => {
            let pull = require(`../slashCommands/${dir}/${cmd}`)
            client.slashCommands.set(pull.name, pull)
        })
    })
}