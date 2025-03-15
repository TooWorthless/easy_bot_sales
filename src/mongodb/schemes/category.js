import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true }, 
    categoryId: { type: Number, unique: true },
});

categorySchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastCategory = await this.constructor.findOne({}, {}, { sort: { categoryId: -1 } });
        this.categoryId = lastCategory ? lastCategory.categoryId + 1 : 1; // Увеличиваем на 1
        next();
    } catch (error) {
        next(error);
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;