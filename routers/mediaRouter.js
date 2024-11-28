// routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Route for uploading media
router.post('/upload', mediaController.uploadMedia);

// Route for viewing media once
router.get('/view/:mediaId/:userId', mediaController.viewMedia);

module.exports = router;