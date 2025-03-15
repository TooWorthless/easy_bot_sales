import User from "../mongodb/schemes/user.js";
import { mainMenu, adminMenu } from "../keyboards/menu.js"; // Импорт клавиатур


export default async function startCommand(bot, chatId, user) {
    try {
        const { id: userId, username, first_name: firstName } = user;

        console.log("User data from Telegram:", user);

        if (!userId) {
            throw new Error("userId не может быть null или undefined");
        }

        let dbUser = await User.findOne({ userId });

        if (!dbUser) {
            dbUser = new User({
                userId,
                username: username || "Без имени",
                firstName,
                balance: 0,
                isAdmin: false,
            });
            await dbUser.save();
        }

        const menu = dbUser.isAdmin ? adminMenu : mainMenu;

        await bot.sendPhoto(chatId, './main_menu.jpg', {
            caption: `👋🏻 Приветик, ${firstName} \n\n💙Добро пожаловать в самый лучший и отзывчивый магазин по продаже цифровых товаров.`,
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