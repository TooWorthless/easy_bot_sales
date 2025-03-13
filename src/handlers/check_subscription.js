export default (bot) => {
    bot.on("callback_query", async (query) => {
        console.log("Получен callback-запрос: ", query);
    });
};
