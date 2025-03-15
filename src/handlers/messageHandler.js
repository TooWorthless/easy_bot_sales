import startCommand from "../commands/start.js";
import profileCommand from "../commands/profile.js";
import productsCommand from "../commands/products.js";
import manageProductsCommand, { handleManageProducts } from "../commands/manageProducts.js";
import supportCommand from "../commands/support.js";
import infoCommand from "../commands/info.js";
import { mainMenu, adminMenu } from "../keyboards/menu.js";
import User from "../mongodb/schemes/user.js";
import referalSystem from "../commands/referals.js";

export default async function messageHandler(bot, msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userId = msg.from.id;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            const newUser = new User({
                userId,
                username: msg.from.username || "Без имени",
                firstName: msg.from.first_name,
                balance: 0,
                isAdmin: false,
            });
            await newUser.save();
        }

        // Обработка команд
        switch (text) {
            case "/start":
                await startCommand(bot, chatId, msg.from);
                break;

            case "🛍 Товары":
                await productsCommand(bot, chatId);
                break;

            case "👤 Профиль":
                await profileCommand(bot, chatId, userId);
                break;

            case "📝 Поддержка":
                await supportCommand(bot, chatId);
                break;

            case "📚 Информация":
                await infoCommand(bot, chatId);
                break;

            case "🎁 Управление товарами 🖍":
                if (user.isAdmin) {
                    await manageProductsCommand(bot, chatId);
                } else {
                    await bot.sendMessage(chatId, "❌ Неизвестная команда. Введите /help для списка команд.");
                }
                break;

            case "🎁 Реферальная система 🎁":
                await referalSystem(bot, chatId);
                break;

            default:
                if (user.isAdmin && (text.startsWith("🎁") || text.startsWith("📁") || text.startsWith("📜") || text === "⬅️ На главную")) {
                    await handleManageProducts(bot, msg);
                } else {
                    await bot.sendMessage(chatId, "❌ Неизвестная команда. Введите /help для списка команд.");
                }
        }
    } catch (error) {
        console.error("Ошибка при обработке сообщения:", error);
        await bot.sendMessage(chatId, "❌ Ошибка! Попробуйте снова.");
    }
}