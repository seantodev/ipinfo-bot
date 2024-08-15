const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');
moment.locale('tr');
module.exports = (client) => {

const commandFile = fs.readdirSync("./src/slashCommands").filter(a => a.endsWith(".js"))
const commands = [];
client.slashCommands = new Discord.Collection()
client.contextCommands = new Discord.Collection()

const commandFile2 = fs.readdirSync("./src/contextMenuCommands").filter(a => a.endsWith(".js"))

for (file of commandFile2) {
    const command = require(`../contextMenuCommands/${file}`)
    client.contextCommands.set(command.data.name, command)
    console.log(chalk.redBright(`Context Menu Command loaded successfully: ${command.data.name}`))
}
console.log(chalk.greenBright('All Context Menu Commands loaded successfully!'))
console.log(`\u200b`)

for (file of commandFile) {
    const command = require(`../slashCommands/${file}`)
    commands.push(command.data)
    client.slashCommands.set(command.data.name, command)
    console.log(chalk.blueBright(`Slash Command loaded succesfully: ${command.data.name}`))
}
console.log(chalk.greenBright('All Slash Commands loaded successfully!'))
console.log(`\u200b`)

const commandsJsonData = [
    ...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
]

client.on('ready', async() => {
    const CLIENT_ID = client.user.id
    const rest = new REST({
        version: 10
    }).setToken(client.config['token']);

        try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commandsJsonData
        });
    } catch (err) {
        if (err) console.log(err)
    }
})

}