let localConfig = {
	hostname: process.env.HOSTNAME || 'localhost',
	port: process.env.PORT || 8080,
	viewDir: './views'
}

module.exports = localConfig;