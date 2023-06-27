const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: 3243773 });

const fs = require('node:fs');
const path = require('node:path');

const Discord = require('discord.js');
let prefix = "/";



client.commands = new Collection();




const Codeforces = require('codeforces-api');
require('dotenv').config();



client.once('ready', () => {
	console.log('¡Estoy listo!');
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Establece un nuevo elemento en la Colección con la clave como el nombre del comando y el valor como el módulo exportado
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[ADVERTENCIA] El comando en ${filePath} no tiene una propiedad requerida "data" o "execute".`);
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No se encontró ningún comando que coincida con ${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
		}
	}
});


client.login(process.env.token);



Codeforces.setApis(process.env.key, process.env.secret);

Codeforces.user.rating({ handle: 'primitivo' } , function (err, data) {

    if (err) {
        console.log(err)
    }

    console.log(data);
});