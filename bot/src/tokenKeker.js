const {
	Client,
	Collection,
} = require('discord.js');
const config = require('./config.json')
module.exports = class tokenKeker extends Client {
	constructor(options) {
		super(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.slashcommands = new Collection();
		this.snipes = new Map();
	}

	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadClientEvents')(this);
		require('./utils/loadWsEvents')(this);

		this.login(config.login);
	}
};
