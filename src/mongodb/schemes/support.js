import mongoose from 'mongoose';

const SupportScheme = new mongoose.Schema({
    support: { type: String, required: false },
    information: { type: String, required: false }
});
const Support = mongoose.model('Support', SupportScheme);

export default Support;