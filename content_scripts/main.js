/*global MessageParser */

var msgs = $('div[message]');

window.parser = new MessageParser(msgs);
window.parser.test();