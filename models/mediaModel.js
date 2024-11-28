// models/Media.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true }, // This could be a URL to the media file
    viewOnce: { type: Boolean, default: true }, // Indicates if this is a view-once media
    viewed: { type: Boolean, default: false },  // Tracks if the media has been viewed
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    expirationDate: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 } // 24 hours by default
});

module.exports = mongoose.model('Media', mediaSchema);