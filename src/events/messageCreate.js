const chalk = require('chalk');
const moment = require('moment');
require('moment-duration-format');
const db = require('quick.db');
moment.locale('tr');
const Discord = require('discord.js');

const { EmbedBuilder } = require('discord.js')
module.exports = message => {
    let client = message.client;
    let config = client.config;
    let prefix = config['prefix'] || "!";
    
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
    let command = message.content.split(' ')[0].slice(prefix.length);
    let args = message.content.split(' ').slice(1);
    let cmd;
  
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      cmd.config.code(client, message, args);
    }
  }

    
  };