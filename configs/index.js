const env = 'local';
const config = require('./local');

let defaultConfig = {
	hostname: config.hostname,
	port: config.port,
	viewDir: config.viewDir
};

module.exports = defaultConfig;