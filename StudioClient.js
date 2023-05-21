const dotenv = require('dotenv');
dotenv.config()

function InvokeStudio(reminder) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  let reminderUrl = 'https://twilio-reminders.herokuapp.com/api/word/' + reminder._id;
  const client = require('twilio')(accountSid, authToken);
  client.studio.v2.flows('FW50c3f8489bec77b9b70010efa4c28ed5')
  .executions
  .create({to: '+16475002510', from: '+18677940506', Parameters: {reminderText: "hello", callbackUrl: 'https://twilio-reminders.herokuapp.com/api/word/646aa8c01a8c55f300f5bb68'}})
  .then(execution => console.log(execution.sid));
}

module.exports = InvokeStudio;