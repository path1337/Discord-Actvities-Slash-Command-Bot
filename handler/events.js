const fs = require("fs")

let events = []

module.exports = async (client) => {

    try {

        const loaddirs = (dir) => {
            const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"))

            for(const file of event_files) {
                try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0];

                    events.push(eventName);
                    client.on(eventName, event.bind(null, client))
                } catch (e) {
                    console.log(e)
                }
            }
        }

        await ["client", "guild"].forEach((e) => loaddirs(e))

    } catch (e) {
        console.log(e)
    }
}