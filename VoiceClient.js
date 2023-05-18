const dotenv = require('dotenv');
dotenv.config()

function makeCall(message) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  let responseTwiml = '<Response><Say>' + message + '</Say></Response>';
  client.calls
  .create({
     to: process.env.TWILIO_TO,
     from: process.env.TWILIO_FROM,
     twiml: responseTwiml,
     record: 'record-from-answer',
     recordingStatusCallback: 'https://eot3mn34tittc57.m.pipedream.net'
   })
  .then(call => console.log(JSON.stringify(call)));
}

module.exports = makeCall;