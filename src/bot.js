import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TOKEN, { polling: true });


export { bot }; 