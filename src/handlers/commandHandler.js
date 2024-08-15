const Discord = require('discord.js');
const chalk = require('chalk');
module.exports = async (client) => {
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require("fs").readdir("./src/commands/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let file = require(`../commands/${f}`);
    if (!file.config) return console.log(` The command loader in the file named ${f.replace(".js", "")} is misspelled so it could not be loaded!`)
    else if (!file["config"]["name"]) return console.log(`It gave an error because the name of the command was not written in the file named ${f.replace(".js", "")}!`)
    else if (typeof file["config"]["aliases"] !== "object") return console.log(`The aliases section is blank or there is no aliases section in the file named ${f.replace(".js", "")}!`)
    else if (!file["config"]["code"] || typeof file["config"]["code"] !== "function") return console.log(`In the file named ${f.replace(".js", "")}, the code part is entered incorrectly!`)
    console.log(chalk.cyanBright(`Prefix Command loaded successfully: ${file['config']['name']}`))
    client.commands.set(file.config.name, file);
    file.config.aliases.forEach(alias => {
      client.aliases.set(alias, file.config.name);
    });
  });
  console.log(chalk.greenBright(`All Prefix Commands loaded successfully`))
  console.log(`\u200b`)
});
}