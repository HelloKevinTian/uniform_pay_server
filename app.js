var http_server = require('./httpServer');


// 开启cpu数量的进程.
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	var server = new http_server("0.0.0.0", 20003);
	server.createHttpServer();
}