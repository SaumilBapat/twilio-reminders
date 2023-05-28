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

function makeCall(reminder) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  let responseTwiml = '<Response><Play>' + reminder.recordingUrl + '</Play></Response>';
  client.calls
  .create({
     from: process.env.TWILIO_FROM,
     to: reminder.mobileNumber,
     twiml: '<Response><Play>' + reminder.recordingUrl + '</Play></Response>'
   })
  .then(call => console.log(call.sid));
}
// let newReminder = {
//   mobileNumber: '+16475002510',
//   recordingUrl: 'https://api.twilio.com/2010-04-01/Accounts/AC429486261abd4c92654da23285e32221/Recordings/REf799316029393ec7444354ccfcb3d5cf'
// };
//makeCall(newReminder);
module.exports = {SendMessage, makeCall};