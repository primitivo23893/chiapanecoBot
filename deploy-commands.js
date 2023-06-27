const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


// Aqui van las credenciales
require('dotenv').config();

const clientId = process.env.clientId
const guildId = process.env.guildId
const token = process.env.token

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Iniciando la actualización de (/) comandos de aplicación');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('(/) Comandos de aplicación recargados con éxito');
	} catch (error) {
		console.error(error);
	}
})();