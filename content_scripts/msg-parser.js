var MessageParser = function (msgs) {
	this.msgs = msgs;
};


MessageParser.prototype.test = function () { 
	console.log(this.msgs);
}