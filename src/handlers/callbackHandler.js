export default async function callbackHandler(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === "close_message") {
        try {
            await bot.deleteMessage(chatId, messageId);
        } catch (error) {
            console.error("Ошибка при удалении сообщения:", error);
        }
    }
}