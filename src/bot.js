import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import connectDB from './mongodb/connect.js';
import messageHandler from "./handlers/messagehandler.js";
import callbackHandler from "./handlers/callbackHandler.js";

dotenv.config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

connectDB()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

bot.on("message", (msg) => messageHandler(bot, msg));
bot.on("callback_query", (query) => callbackHandler(bot, query));

export { bot };