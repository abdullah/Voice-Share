var os = require("os");
os.hostname();
var socket = io.connect(process.env.HOST+process.env.PORT);
