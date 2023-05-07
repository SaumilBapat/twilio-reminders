const axios = require('axios');

const SendMessage = require('./MessagingClient');
const moment = require('moment-timezone');

try {
    axios.get('https://twilio-reminders.herokuapp.com/api/word')
    .then(response => response.data.forEach(function(reminder) {
        let now = moment().tz('America/New_York');
        console.log(now.hour());
        console.log(reminder.time);
        const hour = moment().hour(); // get the hour component of the current time
        if (now.hour() == reminder.time) {
            SendMessage(now.format('YYYY-MM-DD HH:mm:ss') + ':REMINDER: ' + reminder.word);
        }
      }));
        
  } catch (error) {
    console.log(JSON.stringify(error));
  }