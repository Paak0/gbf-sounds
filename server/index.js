const express = require('express');

module.exports = function(){
	let server = express();
	let create;
	let start;
	
	create = function(config){
		let routes = require('./routes');
		
		server.set('port', config.port);
		server.set('hostname', config.hostname);
		server.set('viewDir', config.viewDir);
		
		server.use(express.json());
		
		//server.engine('html', require('ejs').renderFile);
		server.set('view engine', 'ejs');
		//server.set('view engine', 'html');
		server.use(express.static(__dirname+'/public'));
		
		routes.init(server);
	};
	
	start = function(){
		let hostname = server.get('hostname');
		let port = server.get('port');
		server.listen(port, function(){
            console.log('Server is up - http://' + hostname + ':' + port);
		});
	};
	
	return{
		create: create,
		start: start
	};
};