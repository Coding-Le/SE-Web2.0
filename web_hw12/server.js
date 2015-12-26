var http = require('http');
var mongoUrl = 'mongodb://localhost:27017/';  // the port for mongodb is 27017
var mongoclient = require('mongodb').MongoClient;
var port = selectPort(process.env.PORT || '8000');

mongoclient.connect(mongoUrl, function(err, db) {
    if (err) {
        console.log(err);
    } else {
        var app = require('./app')(db);
        app.set('port', port);
        var server = http.createServer(app);
        server.listen(port);
        console.log("Server start to listen on localhost:" + port);
    }
});

function selectPort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}