const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, GatewayIntentBits, Partials ,ButtonBuilder, ButtonStyle, PermissionFlagsBits, ContextMenuCommandBuilder, ApplicationCommandType , ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js')
const fs = require('fs');
const yaml = require('js-yaml');
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
const moment = require('moment');
moment.locale('tr');
const db = require('quick.db');
const ms = require('ms');
const client = new Discord.Client({ 
    intents: [
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration
    ],
    partials: [
        Partials.Channel, 
        Partials.Message, 
        Partials.GuildMember, 
        Partials.Reaction, 
        Partials.User,
    ],
})

client.config = config;

require('./src/handlers/slashCommandHandler')(client);
require('./src/handlers/eventHandler')(client);
require('./src/handlers/commandHandler')(client);

client.on('messageCreate', message => {
    if (message.author.bot) return;
})

client.login(config['token'])