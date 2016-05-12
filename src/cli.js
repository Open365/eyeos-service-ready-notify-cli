#!/usr/bin/env node
var RegisterManager = require('./lib/RegisterManager.js');
var registerManager = new RegisterManager();
var Service = require('./lib/Service.js');

console.log('Starting eyeos-sevice-ready-notify-cli');
if (process.argv.length == 6){
	var service = new Service();
	service.setId(process.argv[2]);
	service.setName(process.argv[3]);
	service.setIp(process.argv[4]);
	service.setPort(process.argv[5]);
	registerManager.registerService(info);
} else if (process.argv.length == 2){
	console.log('Using auto-registering');
	registerManager.autoRegister();
} else {
	console.log("not enough parameters, parameters are: id, type, IP, port");
	return 1;
}
