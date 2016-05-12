var Service = function (id, name, ip, port) {
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.port = parseInt(port);
};

Service.prototype.setId = function (id) {
    this.id = id;
};

Service.prototype.getId = function () {
    return this.id;
};

Service.prototype.setName = function(name){
    this.name = name;
};

Service.prototype.getName = function(){
    return this.name;
};

Service.prototype.setIp = function(ip){
    this.ip =  ip;
};

Service.prototype.getIp = function(){
    return this.ip;
};

Service.prototype.setPort = function (port) {
    this.port = parseInt(port);
};

Service.prototype.getPort = function () {
    return this.port;
};

module.exports = Service;
