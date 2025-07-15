const express = require('express');
const { registerUser, login, userAll } = require('../controller/UserController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', login);  
router.get('/all', userAll);  
module.exports = router;
