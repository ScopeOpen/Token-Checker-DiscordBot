/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
	const messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	const config = require('../../config.json')
	const prefix = config.prefix;

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(messageArray)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	
	if (cmd.slice(matchedPrefix.length) != prefix && matchedPrefix.includes(client.user.id)) {
		cmd = args[0];
		args = args.slice(1);
		commandfile = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
	}
	else {
		commandfile = client.commands.get(cmd.slice(matchedPrefix.length).toString().toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(matchedPrefix.length).toString().toLowerCase()));
	}
	if (commandfile) {
		try {
			await commandfile.run(client, message, args);
		}
		catch (err) {
			message.reply(`An error occured!\nError: ${require('util').inspect(err, { depth: 0 })}`, {
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
	}
};
