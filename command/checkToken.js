const Discord = require('discord.js');
const request = require('request');
const chalk = require('chalk');
const fs = require('fs');

var invalid = [];
var verified = [];
var unverified = [];
token = args[0]
request({
    method: "GET",
    url: "https://discordapp.com/api/v7/users/@me",
    headers: {
        authorization: token
    }
}, (error, response, body) => {
    if (!body) return;
    var json = JSON.parse(body);
    if (!json.id) {
        invalid.push(token);
        const embed = new Discord.MessageEmbed()
		    .setTitle(`Invalid Token`)
		    .setColor('RED')
            .setDescription(token)
	    message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
    } else if (!json.verified) {
        unverified.push(token);
        const embed1 = new Discord.MessageEmbed()
		    .setTitle(`Unverified Token`)
		    .setColor('ORANGE')
            .setDescription(token)
	    message.reply({ embed: embed1, allowedMentions: { repliedUser: false } });
    } else {
        verified.push(token);
        const embed2 = new Discord.MessageEmbed()
		    .setTitle(`Valid Token`)
		    .setColor('GREEN')
            .setDescription(token)
	    message.reply({ embed: embed2, allowedMentions: { repliedUser: false } });
    }
    console.clear();
    var text = "";
    text += chalk.green(`Verified: ${verified.length}`);
    text += chalk.blue(" | ");
    text += chalk.yellow(`Unverified: ${unverified.length}`);
    text += chalk.blue(" | ");
    text += chalk.red(`Invalid: ${invalid.length}`);
    text += chalk.blue(" | ")
    text += chalk.cyanBright(`Token: ${token}`)

    console.log(text);
});