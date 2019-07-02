const apiRoute = require('./apis');
const homeRoute = require('./home');
const errorRoute = require('./error');
const charactersRoute = require('./characters');

function init(server){
    server.get('*', function (req, res, next){
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res){
        res.render('index');
    });

    server.use('/api', apiRoute);
    server.use('/home', homeRoute);
    server.use('/error', errorRoute);
	server.use('/characters', charactersRoute);
}

module.exports = {
    init: init
};