import Support from "../mongodb/schemes/support.js";

export default async function infoCommand(bot, chatId) {
    const support = await Support.findOne();
    const infoText = support && support.information ? support.information : "Информация временно недоступна.";

    await bot.sendMessage(chatId, infoText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Закрыть", callback_data: "close_message" }]
            ],
        },
    });
}