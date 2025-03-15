export default async function productsCommand(bot, chatId) {
    await bot.sendMessage(chatId, "◽️ Товары в данной категории временно отсутствуют.");
}