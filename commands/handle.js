const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('handle')
		.setDescription('Asigna usuario en Codeforces.')
        .addStringOption(option=> option.setName('handle').setDescription('Usuario de Codeforces.').setRequired(true)),

	async execute(interaction) {
        const handle = interaction.options.getString('handle');

		return interaction.reply(`:x: <@${interaction.user.id}> su handle:**${handle}**, no ha sido aceptado.\n _error en codeforces_`);
	},
};