const express = require('express');
const router = express.Router();
const JwtMiddleware = require('../app/middleware/Jwt');
const blogController = require('../app/controllers/BlogController');
const guestController = require('../app/controllers/GuestController');
const CreateBlogValidator = require("../app/requests/CreateBlogValidators");
const GuestSearchValidator = require("../app/requests/GuestSearchValidator");
const UpdateBlogValidator = require("../app/requests/UpdateBlogValidator");


/** Public Endpoints */

router.get('/all', guestController.fetchAllBlog);
router.get('/read/:id', guestController.readBlog);
router.post('/search', GuestSearchValidator.search, guestController.searchBlog);

/** Protected Route */

router.get('/lists', JwtMiddleware, blogController.fetchAllBlog);
router.post('/create', JwtMiddleware, CreateBlogValidator.blog, blogController.create);
router.put('/update', JwtMiddleware, UpdateBlogValidator.update, blogController.updateBlog);
router.delete('/delete/:id', JwtMiddleware, blogController.delteBlog);
module.exports = router;