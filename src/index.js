import dotenv from "dotenv";
import connectDB from './mongodb/connect.js';

dotenv.config();
import { bot } from "./bot.js";
import startHandler from './handlers/start.js';
import check_subscription from "./handlers/check_subscription.js";


async function main() {
    startHandler(bot);
    check_subscription(bot);
}



connectDB().then(() => {
    main().then(() => {
        console.log("bot started");
    }).catch((err) => {
        console.log(err);
    });
})

