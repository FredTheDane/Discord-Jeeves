var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Attach and configure Logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize the bot with the token from Auth
var bot = new discord.Client({
    token: auth.token,
    autorun: true
});

// Log when Jeeves is ready to go!
bot.on('ready', function() {
    logger.log('info', 'Jeeves has entered the building!')
    logger.log('info', 'Logged in as %s - %s', bot.username, bot.id);
});

// Handle new messages
bot.on('message', function(user, userID, channelID, message, event) {
    // Simple Ping Command
    if (message === "ping") {
        logger.log('info', 'Ping command triggered by %s in channel', user, channelID);
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});