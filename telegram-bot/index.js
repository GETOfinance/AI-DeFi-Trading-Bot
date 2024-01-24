const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001; // You can set the port number here

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Replace with your Telegram bot token
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL =
  "https://rnjcy-2406-7400-63-1b8a-d826-ebc1-4f92-f2eb.a.free.pinggy.online" +
  URI;

app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  // Respond to the message
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: `You said: ${text}`,
  });

  return res.send();
});

app.listen(port, async () => {
  console.log(`Telegram bot listening on port ${port}`);
  await init(); // Set the webhook
});
