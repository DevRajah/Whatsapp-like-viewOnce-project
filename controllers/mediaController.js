// controllers/mediaController.js
const Media = require('../models/mediaModel');

// Upload media
exports.uploadMedia = async (req, res) => {
    try {
        const { userId, content } = req.body;

        const media = new Media({
            userId,
            content,
            viewOnce: true,
            expirationDate: Date.now() + 24 * 60 * 60 * 1000 // Expire in 24 hours
        });

        const savedMedia = await media.save();
        res.status(201).json({ message: 'Media uploaded successfully', mediaId: savedMedia._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload media', error });
    }
};

// View media once
exports.viewMedia = async (req, res) => {
    const { mediaId, userId } = req.params;
  
    try {
      const media = await Media.findById(mediaId);
  
      if (!media) {
        return res.status(404).json({ message: 'Media not found' });
      }
  
      // Check if user has already viewed the media
      if (media.viewedBy.includes(userId)) {
        return res.status(403).json({ message: 'You have already viewed this media once.' });
      }
  
      // If not viewed, add user to viewedBy array and save
      media.viewedBy.push(userId);
      await media.save();
  
      res.status(200).json({ media });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve media' });
    }
  };

// Delete expired media
exports.deleteExpiredMedia = async () => {
    try {
        const expiredMedia = await Media.find({ 
            viewOnce: true, 
            viewed: true, 
            expirationDate: { $lt: Date.now() } 
        });

        for (const media of expiredMedia) {
            await Media.findByIdAndDelete(media._id);
        }

        console.log(`${expiredMedia.length} expired media items deleted`);
    } catch (error) {
        console.error('Failed to delete expired media:', error);
    }
};