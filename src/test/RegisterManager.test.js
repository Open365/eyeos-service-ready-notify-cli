var sinon = require('sinon');
var RegisterManager = require('../lib/RegisterManager.js');
var Service = require('../lib/Service.js');

suite('RegisterManager', function () {
	var sut, notify, service;
	setup(function () {
		service = new Service('test1', 'test', '127.0.0.1', 0);
		notify = {
			registerService: sinon.stub()
		};
		sut = new RegisterManager(notify, service);
	});

	teardown(function () {

	});

	suite('#registerService', function () {
		test('Should call registerService on the library', function () {
			sut.registerService(service);
			sinon.assert.calledWithExactly(notify.registerService, service.getId(), service.getName(), service.getIp(), service.getPort(), sinon.match.func);
		});
	});
});
