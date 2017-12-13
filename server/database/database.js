var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/messages');

var Schema = mongoose.Schema;
var msgSchema = new Schema({
	name: String,
	link: String
});

var Msg = mongoose.model('Msg', msgSchema);

module.exports = Msg;