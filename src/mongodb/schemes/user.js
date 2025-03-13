import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    telegramId: { type: Number, required: true, unique: true },
    username: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;