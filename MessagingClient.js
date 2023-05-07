const dotenv = require('dotenv');
dotenv.config()

function SendMessage(message) {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    client.messages.create({
        from: process.env.TWILIO_FROM,
        to: process.env.TWILIO_TO,
        body: message
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}


module.exports = SendMessage;