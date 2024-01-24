import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body); // Log every incoming message

      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

      // Check if the update is a message or a callback query from an inline keyboard
      if (req.body.message) {
        const chatId = req.body.message.chat.id;
        const text = req.body.message.text;

        if (text === "/start") {
          await sendTelegramMessage(
            chatId,
            "Welcome to Botcoin!",
            null,
            TELEGRAM_API
          );

          // Set a timeout to execute after 5 seconds
          setTimeout(async () => {
            const keyboard = [
              [
                { text: "Yes ✅", callback_data: "change_yes" },
                { text: "No ❌", callback_data: "change_no" },
              ],
            ];
            await sendTelegramMessage(
              chatId,
              `❌❌ WE ARE LOSING ❌❌

The strategy is not optimised for the market right now, we are losing money. 😤😤

<b>Suggestion: Deploy a new strategy parameter around "Sentiment Analysis"
It can be a valuable tool in trading for gaining insights into market sentiment, investor emotions, and overall market dynamics.</b> <a href="trade-bot.netlify.app">Know more</a>`,
              keyboard,
              TELEGRAM_API
            );
          }, 5000);

          setTimeout(async () => {
            const message =
              "📣🌟 NEW TOKEN ALERT 🌟📣\n\nAEUR is a new token in the market. " +
              "<a href='trade-bot.netlify.app'>View details</a>.\n\n" +
              "<b>ADD TO PORTFOLIO TO MAKE THE MOST OF IT</b>";
            await sendTelegramMessage(chatId, message, null, TELEGRAM_API);
          }, 15000);
        } else if (text === "/changestrategy") {
          const keyboard = [
            [
              { text: "Yes ✅", callback_data: "change_yes" },
              { text: "No ❌", callback_data: "change_no" },
            ],
          ];
          await sendTelegramMessage(
            chatId,
            `❌❌ WE ARE LOSING ❌❌

The strategy is not optimised for the market right now, we are losing money. 😤😤

<b>Suggestion: Deploy a new strategy parameter around "Sentiment Analysis"
It can be a valuable tool in trading for gaining insights into market sentiment, investor emotions, and overall market dynamics.</b> <a href="/">Know more</a>  

YES AND NO OPTION`,
            keyboard,
            TELEGRAM_API
          );
        } else if (text === "/showforecast") {
          const imageUrl =
            "https://i.ibb.co/jvjw8LY/Screenshot-2023-12-07-at-5-29-00-PM.png";
          const caption = `➕➕ POTENTIAL PROFIT GAIN ➕➕

Actual : $600
Estimate : $1000

🚀 Lets keep going 🚀`;
          await sendTelegramPhoto(chatId, imageUrl, caption, TELEGRAM_API);
        } else if (text === "/tax") {
          const keyboard = [
            [{ text: "Send ✅", callback_data: "send_tax_info" }],
          ];
          await sendTelegramMessage(
            chatId,
            `📄 TAX INFORMATION 📄

The tax charged on the gains between the financial year of 2023-2024 will be sent to you via mail.`,
            keyboard,
            TELEGRAM_API
          );
        } else {
          // Echo the received message
          await sendTelegramMessage(
            chatId,
            `You said: ${text}`,
            null,
            TELEGRAM_API
          );
        }
      } else if (req.body.callback_query) {
        // Handle callback query from inline keyboard
        const callbackQuery = req.body.callback_query;
        const data = callbackQuery.data; // 'change_yes', 'change_no', or 'send_tax_info'
        const chatId = callbackQuery.message.chat.id;

        // Respond to the callback query
        await axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
          callback_query_id: callbackQuery.id,
        });

        if (data === "send_tax_info") {
          await sendTelegramMessage(
            chatId,
            "Your tax info will be mailed to you shortly.",
            null,
            TELEGRAM_API
          );
        } else {
          // Handle other callback queries like 'change_yes' or 'change_no'
          await sendTelegramMessage(
            chatId,
            `Your strategy will be updated!`,
            null,
            TELEGRAM_API
          );
        }
      }

      res.status(200).send("OK");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Function to send a message with optional inline keyboard
async function sendTelegramMessage(chatId, text, keyboard, TELEGRAM_API) {
  const data = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    ...(keyboard && {
      reply_markup: JSON.stringify({ inline_keyboard: keyboard }),
    }),
  };

  return axios.post(`${TELEGRAM_API}/sendMessage`, data);
}

async function sendTelegramPhoto(chatId, photoUrl, caption, TELEGRAM_API) {
  const data = {
    chat_id: chatId,
    photo: photoUrl,
    caption: caption,
  };

  return axios.post(`${TELEGRAM_API}/sendPhoto`, data);
}
