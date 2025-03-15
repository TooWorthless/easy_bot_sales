import User from "../mongodb/schemes/user.js";
import { mainMenu, adminMenu } from "../keyboards/menu.js";

export default async function startCommand(bot, chatId, user) {
    try {
        let dbUser = await User.findOne({ userId: user.id });
        if (!dbUser) {
            dbUser = new User({
                userId: user.id,
                username: user.username || "Без имени",
                firstName: user.first_name,
                balance: 0,
                isAdmin: false,
            });
            await dbUser.save();
        }

        const menu = dbUser.isAdmin ? adminMenu : mainMenu;

        await bot.sendPhoto(chatId, './main_menu.jpg', {
            caption: `👋🏻 Приветик, ${user.first_name} \n\n💙Добро пожаловать в самый лучший и отзывчивый магазин по продаже цифровых товаров.`,
            reply_markup: {
                keyboard: menu,
                resize_keyboard: true,
            },
        });
    } catch (error) {
        console.error("Ошибка при сохранении пользователя:", error);
        bot.sendMessage(chatId, "❌ Ошибка! Попробуйте снова.");
    }
}