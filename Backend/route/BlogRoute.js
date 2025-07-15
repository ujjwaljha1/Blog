const express = require('express')
const { post, allPosts } = require('../controller/BlogController')

const router = express.Router() 

router.post('/post', post)
router.post('/all',allPosts)

module.exports = router