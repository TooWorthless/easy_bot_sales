import startCommand from "../commands/start.js";
import profileCommand from "../commands/profile.js";
import { adminProductManagementMenu } from "../keyboards/menu.js";
import User from "../mongodb/schemes/user.js";

export default async function messageHandler(bot, msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userId = msg.from.id;

    switch (text) {
        case "/start":
            await startCommand(bot, chatId, msg.from);
            break;

        case "👤 Профиль":
            await profileCommand(bot, chatId, userId);
            break;

        case "🎁 Управление товарами 🖍":
            const user = await User.findOne({ userId });
            if (user && user.isAdmin) {
                await bot.sendMessage(chatId, "🎁 Редактирование товаров, разделов и категорий 📜", {
                    reply_markup: {
                        keyboard: adminProductManagementMenu,
                        resize_keyboard: true,
                    },
                });
            }
            break;

        default:
            bot.sendMessage(chatId, "❌ Неизвестная команда. Введите /help для списка команд.");
            break;
    }
}