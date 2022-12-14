const blogModel = require('../models/Blog');
const readingTime = require('../../utils/readTime');
const { matchedData } = require("express-validator");
const BlogState = 'published';

function create(req, res, next) {
    let count = readingTime(req.body.body);
    count += 'mins';
    blogModel.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.auth.user._id,
        reading_time: count,
        read_count: 0,
        tags: req.body.tags,
        body: req.body.body,
    }).then(result => {

        return res.status(200).json({
            "status": "success",
            "message": "Blog Cretaed Successfully",
            "data": result
        })
    }).catch(err => {
        err.type = 'Identical Blog Title'
        return next(err)

    });

}

async function fetchAllBlog(req, res, next) {
    let search = {}
    const { page = 1, limit = 2 } = req.query; // destructure page and limit and set default values
    const skip = (page - 1) * limit;

    if (req.query.state) search.state = req.query.state
    search.author = req.body.auth.user._id

    try {

        const blogs = await blogModel.find(search).populate({ path: 'authorDetails' }).sort({ read_count: 1, reading_time: 1, timestamp: 1 })
            .limit(limit * 1) // execute query with page and limit values
            .skip(skip)
            .exec();

        const count = await blogModel.countDocuments(); // get total documents in the blogs collection 
        if (skip > count || !blogs) {
            err.type = 'Invallid Page';
            return next(err)
        }

        // return response with blogs, total pages, and current page
        res.json({
            status: "success",
            message: "Blog list found!!!",
            data: {
                blogs,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            }
        });
    } catch (err) {
        err.type = 'No Data';
        next(err)
    }
}

async function fetchSingleBlog(req, res, next) {

    try {

        const blogs = await blogModel.find({}).populate({ path: 'authorDetails' }).sort({ read_count: 1, reading_time: 1, timestamp: 1 })

        if (skip > count || !blogs) {
            err.type = 'Invallid Page';
            return next(err)
        }

        // return response with blogs, total pages, and current page
        res.json({
            status: "success",
            message: "Blog list found!!!",
            data: {
                blogs,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            }
        });
    } catch (err) {
        err.type = 'No Data';
        next(err)
    }

}

async function updateBlog(req, res, next) {

    const requiredData = matchedData(req, { includeOptionals: false }); // get the validated data from request
    id = requiredData.blog_id
    delete requiredData.blog_id // delete the blog_id key from the request

    try {

        const blog = await blogModel.findOneAndUpdate({ _id: id, author: req.body.auth.user._id }, { $set: requiredData }, { new: true }).populate({ path: 'authorDetails' })

        if (!blog) {
            err.type = 'Invallid ID';
            return next(err)
        }

        res.status(200).json({
            status: "success",
            message: "Blog Updated Sucessfully!!!",
            data: { blod: blog }
        });

    } catch (err) {
        err.type = 'No Data';
        next(err)
    }
}

async function delteBlog(req, res, next) {

    const id = req.params.id;

    try {

        const blog = await blogModel.findOneAndDelete({ _id: id, author: req.body.auth.user._id })

        if (!blog) {
            err.type = 'Invallid ID';
            return next(err)
        }

        res.status(200).json({
            status: "success",
            message: "Blog Deleted Sucessfully!!!",
            data: { blod: blog }
        });

    } catch (err) {
        err.type = 'No Data';
        next(err)
    }
}


function authenticate(req, res, next) {
    console.log('i am here')
    return
}

module.exports = {
    create,
    fetchAllBlog,
    updateBlog,
    delteBlog,
    fetchSingleBlog
}