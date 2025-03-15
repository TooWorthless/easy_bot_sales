import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: false },
    firstName: { type: String, required: false },
    balance: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;