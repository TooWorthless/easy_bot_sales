import Support from "../mongodb/schemes/support.js";

export default async function supportCommand(bot, chatId) {
    const support = await Support.findOne();
    const supportText = support ? support.support : "Информация о поддержке временно недоступна.";

    await bot.sendMessage(chatId, supportText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Закрыть", callback_data: "close_message" }]
            ],
        },
    });
}