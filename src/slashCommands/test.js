const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute (client, interaction) {
       interaction.reply('test')

    }
}