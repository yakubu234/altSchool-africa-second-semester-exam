const blogModel = require('../models/Blog');
const readingTime = require('../../utils/readTime');
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

async function fetchAll(req, res, next) {

    const { page = 1, limit = 2 } = req.query; // destructure page and limit and set default values
    const skip = (page - 1) * limit;
    try {

        const blogs = await blogModel.find({}).populate({ path: 'authorDetails' }) // execute query with page and limit values
            .limit(limit * 1)
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

        const blogs = await blogModel.find({}).populate({ path: 'authorDetails' })

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

}

async function listBlog(req, res, next) {
    return res.json(req.body.auth.user._id)
}



function authenticate(req, res, next) {
    console.log('i am here')
    return
}

module.exports = {
    create,
    fetchAll,
    updateBlog,
    listBlog,
    fetchSingleBlog
}