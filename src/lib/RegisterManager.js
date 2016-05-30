var exec = require('child_process').exec;
var EyeosServiceReadyNotify = require('eyeos-service-ready-notify');
var Service = require('./Service.js');

var RegisterManager = function (readyNotify, injectedService) {
	this.readyNotify = readyNotify || new EyeosServiceReadyNotify();
	this.service = injectedService || new Service();
};

RegisterManager.prototype.autoRegister = function () {
	this.__harvestInfo();
};

RegisterManager.prototype.__harvestInfo = function () {
	this.service.setPort(0); //at the moment we aren't using it but the library requires it.
	this.service.setName(process.env.WHATAMI);
	var self = this;
	this.__getHostName(function(hostname){
		self.service.setId(hostname);
		self.__getIp(function(ip){
			var publicIp = process.env.PUBLIC_IP || ip;
			self.service.setIp(publicIp);
			self.registerService(self.service);
		});
	});
};

RegisterManager.prototype.__getHostName = function (callback) {
	this.__execute('hostname', function (response) {
		var arr = response.split('\n');
		var hostname = arr[0];
		callback(hostname);
	});
};

RegisterManager.prototype.__getIp = function (callback) {
	this.__execute('hostname -i', function (response) {
		var arr = response.split('\n');
		var ip = '';
		if(arr[0].indexOf(' ') > -1){
			var firstIp = arr[0].split(' ');
			ip = firstIp[0];
		} else {
			ip = arr[0];
		}
		callback(ip);
	});
};

RegisterManager.prototype.__execute = function(command, callback){
	exec(command, function (error, stdout, stderr) {
		if(error) {
			console.log('Execution of command ', command, 'failed with', error, stderr);
		} else {
			callback(stdout);
		}
	});
};

RegisterManager.prototype.registerService = function (service) {
	console.log('Calling registerService with the following info:', service);
	this.readyNotify.registerService(service.getId(), service.getName(), service.getIp(), service.getPort(), function (result) {
		console.log(result);
	});
};

module.exports = RegisterManager;
