const Discord = require('discord.js');
const fetch = require('node-fetch');

const hasFunds = new Discord.WebhookClient("Webhook ID", "Webhook Token")
const fundsPublic = new Discord.WebhookClient("Webhook ID", "Webhook Token")
const fundsPrivate = new Discord.WebhookClient("Webhook ID", "Webhook Token")

function checkG() {
    fetch(`https://groups.roblox.com/v1/groups/${Math.floor(Math.random() * Math.floor(5500000))}`).then(res => {
        res.json().then(body => {
            if (body.owner === null && body.publicEntryAllowed === true) {
                fetch(`https://economy.roblox.com/v1/groups/${body.id}/currency`).then(res2 => {
                    res2.json().then(body2 => {
                        if (body2.errors) {
                            if (body.description === "") {
                                const embed = new Discord.RichEmbed()
                                    .setAuthor("Made by amazman @ v3rmillion.net", "https://cdn.discordapp.com/icons/670407759698722847/8b663acc35679c143d29ad01ef18c597.png")
                                    .setTitle(body.name)
                                    .setURL(`https://www.roblox.com/groups/${body.id}`)
                                    .setColor("RANDOM")
                                    .addField("Member Count:", body.memberCount, true)
                                    .addField("Robux:", `Funds are private.`, true)
                                    .addField("Group Description:", "N/A")
                                    .setFooter(`Report any bugs to: amazman#2683 (564175392978632715) | amazman @ v3rmillion.net`)
                                    .setTimestamp();
                                fundsPrivate.send(embed)
                            } else {
                                const embed = new Discord.RichEmbed()
                                    .setAuthor("Made by amazman @ v3rmillion.net", "https://cdn.discordapp.com/icons/670407759698722847/8b663acc35679c143d29ad01ef18c597.png")
                                    .setTitle(body.name)
                                    .setURL(`https://www.roblox.com/groups/${body.id}`)
                                    .setColor("RANDOM")
                                    .addField("Member Count:", body.memberCount, true)
                                    .addField("Robux:", `Funds are private.`, true)
                                    .addField("Group Description:", body.description)
                                    .setFooter(`Report any bugs to: amazman#2683 (564175392978632715) | amazman @ v3rmillion.net`)
                                    .setTimestamp();
                                fundsPrivate.send(embed)
                            }
                        } else if (body2.robux >= 1) {
                            const embed = new Discord.RichEmbed()
                                .setAuthor("Made by amazman @ v3rmillion.net", "https://cdn.discordapp.com/icons/670407759698722847/8b663acc35679c143d29ad01ef18c597.png")
                                .setTitle(body.name)
                                .setURL(`https://www.roblox.com/groups/${body.id}`)
                                .setColor("RANDOM")
                                .addField("Member Count:", body.memberCount, true)
                                .addField("Robux:", body2.robux, true)
                                .addField("Group Description:", body.description)
                                .setFooter(`Report any bugs to: amazman#2683 (564175392978632715) | amazman @ v3rmillion.net`)
                                .setTimestamp();
                            hasFunds.send(embed)
                        } else {
                            const embed = new Discord.RichEmbed()
                                .setAuthor("Made by amazman @ v3rmillion.net", "https://cdn.discordapp.com/icons/670407759698722847/8b663acc35679c143d29ad01ef18c597.png")
                                .setTitle(body.name)
                                .setURL(`https://www.roblox.com/groups/${body.id}`)
                                .setColor("RANDOM")
                                .addField("Member Count:", body.memberCount, true)
                                .addField("Robux:", body2.robux, true)
                                .addField("Group Description:", body.description)
                                .setFooter(`Report any bugs to: amazman#2683 (564175392978632715) | amazman @ v3rmillion.net`)
                                .setTimestamp();
                            fundsPublic.send(embed)
                        }

                    })
                })
            } else {
                console.log(`Group has an owner.`)
            }

        })
    })
}

setInterval(checkG, 1000)