import User from "../mongodb/schemes/user.js";

export default async function profileCommand(bot, chatId, userId) {
    const user = await User.findOne({ userId });

    if (!user) {
        return bot.sendMessage(chatId, "❌ Ваш профиль не найден. Введите /start.");
    }

    await bot.sendMessage(chatId,
        `◽️ Профиль\n` +
        `➖➖➖➖➖➖➖➖➖➖➖➖➖\n` +
        `◾️ ID: ${user.userId}\n` +
        `◾️ Логин: @${user.username}\n` +
        `◾️ Регистрация: ${user.createdAt}\n` +
        `➖➖➖➖➖➖➖➖➖➖➖➖➖\n` +
        `◾️ Баланс: 0руб\n` +
        `◾️ Всего пополнено: 0₽\n` +
        `◾️ Заработано с реф-ов: 0₽\n` +
        `◾️ Количество реф-ов: 0шт.\n` +
        `◾️ Куплено товаров: 0шт.\n`
    );
}