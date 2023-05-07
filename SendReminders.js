const SendMessage = require('./MessagingClient');
const moment = require('moment-timezone');

let now = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
SendMessage('Send Reminder: ' + now);