const dotenv = require('dotenv');
dotenv.config()

function makeCall(reminder) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  let responseTwiml = '<Response><Say>' + reminder.textReminder + '</Say></Response>';
  client.calls
  .create({
     to: process.env.TWILIO_TO,
     from: reminder.mobileNumber,
     twiml: responseTwiml,
     record: 'record-from-answer',
     recordingStatusCallback: 'https://eot3mn34tittc57.m.pipedream.net'
   })
  .then(call => console.log(JSON.stringify(call)));
}

module.exports = makeCall;