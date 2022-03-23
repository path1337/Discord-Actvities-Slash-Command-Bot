const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const fetch = require("node-fetch")

const activities = {
    betrayal: {
        id: "773336526917861400",
        name: "Betrayal.io",
    },
    doodlecrew: {
        id: "878067389634314250",
        name: "DoodleCrew",
    },
    lettertile: {
        id: "879863686565621790",
        name: "LetterTile",
    },
    wordsnacks: {
        id: "879863976006127627",
        name: "WordSnacks",
    },
    watchTogether: {
        id: "880218394199220334",
        name: "Watch Together",
    },
    awkword: {
        id: "879863881349087252",
        name: "Awkword",
    },
    sketchyartist: {
        id: "879864070101172255",
        name: "SketchyArtist",
    },
    sketchheads: {
        id: "902271654783242291",
        name: "Sketchheads",
    },
    fishing: {
        id: "814288819477020702",
        name: "Fishington.io (Performance Issues)",
    },
    poker: {
        id: "755827207812677713",
        name: "Poker Night (Boost Level 1)",
    },
    chess: {
        id: "832012774040141894",
        name: "Chess in the Park (Boost Level 1)",
    },
    spellcast: {
        id: "852509694341283871",
        name: "Spellcast (Boost Level 1)",
    },
    checkers: {
        id: "832013003968348200",
        name: "Checkers In The Park (Boost Level 1)",
    },
}

module.exports = {
    name: "activity",
    description: "Start a Voice Channel Activity",
    options: [
        {
            name: "channel",
            description: "Which Channel do you choose?",
            type: 7,
            channel_types: [2],
            required: true
        },
        {
            name: "activity",
            description: "Which Activity do you choose?",
            type: 3,
            choices: Object.entries(activities).map((e) => ({ name: e[1].name, value: e[0] })),
            required: true
        }
    ],
    run: async(interaction, client) => {
        try {

            const channel = interaction.options.getChannel("channel");
            const activity = activities[interaction.options.getString("activity")];

            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: activity.id,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),

                headers: {
                    "Authorization": `Bot ${client.token}`,
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json()).then(invite => {

                const NoCode = new MessageEmbed()
                .setColor(ee.errcolor)
                .setDescription(`Cant start Activity, try again!`)
                if (!invite.code) return interaction.reply({ embeds: [NoCode], ephemeral: true })

                const NoPerms = new MessageEmbed()
                .setColor(ee.errcolor)
                .setDescription(`:x: I dont have \`Create Invite Link\` Permission in this Voice Channel!`)
                if(invite.code === "50013") return interaction.reply({ embeds: [NoPerms], ephemeral: true })

                interaction.reply({ content: `[Click to start ${activity.name} in ${channel.name}](https://discord.com/invite/${invite.code})`})
            })


        } catch (e) {
            console.log(e)
            await interaction.reply({ content: ":x: Something went wrong, try Again!", ephemeral: true })
        }
    }
}
