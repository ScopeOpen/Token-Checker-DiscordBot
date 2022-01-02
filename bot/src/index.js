const {
	Intents,
} = require('discord.js');
const tokenKeker = require('./tokenKeker');

require('dotenv').config();
const client = new tokenKeker({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: Intents.ALL,
	},
	disableMentions: 'everyone',
});
client.queue = new Map();


client.setup();