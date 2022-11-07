const express = require('express');
const router = express.Router();
const JwtMiddleware = require('../app/middleware/Jwt');
const blogController = require('../app/controllers/BlogController');
const guestController = require('../app/controllers/GuestController');
const CreateBlogValidator = require("../app/requests/CreateBlogValidators");


/** Public Endpoints */

router.get('/all', guestController.fetchAllBlog);
router.get('/read/:id', guestController.readBlog);
router.post('/search', guestController.searchBlog);



/** Protected Route */

router.get('/lists', JwtMiddleware, blogController.listBlog);
router.post('/create', JwtMiddleware, CreateBlogValidator.blog, blogController.create);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.create);
module.exports = router;