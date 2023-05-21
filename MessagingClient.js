const dotenv = require('dotenv');
dotenv.config()

function SendMessage(reminder) {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    client.messages.create({
        from: process.env.TWILIO_FROM,
        to: reminder.mobileNumber,
        body: reminder.textReminder
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}

function makeCall(message) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  let responseTwiml = '<Response><Say>' + message + '</Say></Response>';
  client.calls
  .create({
     to: process.env.TWILIO_TO,
     from: process.env.TWILIO_FROM,
     twiml: responseTwiml
   })
  .then(call => console.log(call.sid));
}


module.exports = SendMessage;