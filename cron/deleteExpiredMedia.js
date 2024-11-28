// cron/deleteExpiredMedia.js
const cron = require('node-cron');
const mediaController = require('../controllers/mediaController');

// Run every hour to delete expired media
cron.schedule('0 * * * *', () => {
    console.log('Running scheduled task: delete expired media');
    mediaController.deleteExpiredMedia();
});