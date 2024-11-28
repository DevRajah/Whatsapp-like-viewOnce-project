const express = require('express');
const { signUp,
    loginUser,
     } = require('../controllers/userController');

const router = express.Router();

router.post('/register', signUp);
router.post('/log-in', loginUser);


module.exports = router;
