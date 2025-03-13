import User from '../mongodb/schemes/user.js';

export default (bot) => {

    bot.onText(/\/start/, async (msg) => {

        const chatId = msg.chat.id;
        const username = msg.from.username || 'Неизвестный';
        const firstName = msg.from.first_name || '';
        const lastName = msg.from.last_name || '';

        try {
            let user = await User.findOne({ telegramId: chatId });
            if (!user) {
                user = new User({
                    telegramId: chatId,
                    username,
                    firstName,
                    lastName
                })
                await user.save()
                console.log(`Added ${username}`);
            }
        } catch (error) {
            console.error('Ошибка при сохранении пользователя:', error);
            bot.sendMessage(chatId, 'Произошла ошибка, попробуйте позже.');
        }

        bot.sendMessage(chatId, "*❗️ Ошибка!\nВы не подписались на канал.*", {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Подписаться", url: "https://t.me/+z1XC4lE-EcpmZjJi" }],
                    [{ text: "Проверить ✅", callback_data: 'check_subscription' }]
                ]
            }
        });
    });
};