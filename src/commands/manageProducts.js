import { adminProductManagementMenu } from "../keyboards/menu.js";
import startCommand from "./start.js";
import Category from "../mongodb/schemes/category.js";

export default async function manageProductsCommand(bot, chatId) {
    await bot.sendMessage(chatId, "🎁 Редактирование товаров, разделов и категорий 📜", {
        reply_markup: {
            keyboard: adminProductManagementMenu,
            resize_keyboard: true,
        },
    });
}

export async function handleManageProducts(bot, msg) {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case "🎁 Добавить товары ➕":
            if (condition) {

            } else {
                await bot.sendMessage(chatId, "❌ Отсутствуют позиции для добавления товара.");
            }
            break;

        case "🎁 Изменить товары 🖍":
            await bot.sendMessage(chatId, "Изменение товаров...");
            break;

        case "🎁 Удалить товары ❌":
            await bot.sendMessage(chatId, "Удаление товаров...");
            break;

        case "📁 Создать позицию ➕":
            if (condition) {

            } else {
                await bot.sendMessage(chatId, "❌ Отсутствуют категории для создания позиции.");
            }
            break;

        case "📁 Изменить позицию 🖍":
            await bot.sendMessage(chatId, "Изменение позиции...");
            break;

        case "📁 Удалить позиции ❌":
            await bot.sendMessage(chatId, "Удаление позиций...");
            break;

        case "📜 Создать категорию ➕":
            await bot.sendMessage(chatId, "📜 Введите название для категории 🏷")
            await bot.on("message", async (msg) => {
                const text = msg.text;
                const newCategory = new Category({
                    categoryName: text,
                });
                newCategory.save();
                console.log("Category created: ", newCategory.categoryName);
            }) 
            break;

        case "📜 Изменить категорию 🖍":
            await bot.sendMessage(chatId, "Изменение категории...");
            break;

        case "📜 Удалить категории ❌":
            await bot.sendMessage(chatId, "Удаление категорий...");
            break;

        case "⬅️ На главную":
            await startCommand(bot, chatId, msg.from);
            break;

        default:
            await bot.sendMessage(chatId, "❌ Неизвестная команда. Введите /help для списка команд.");
    }
}