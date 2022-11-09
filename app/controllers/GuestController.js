const blogModel = require('../models/Blog');
const { matchedData } = require("express-validator");
const BlogState = 'published';


async function fetchAllBlog(req, res, next) {

    const { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
    const skip = (page - 1) * limit;
    try {

        const blogs = await blogModel.find({}).sort({ read_count: 1, reading_time: 1, timestamp: 1 }).populate({ path: 'authorDetails' }) // execute query with page and limit values
            .limit(limit * 1)
            .skip(skip)
            .exec();

        const count = await blogModel.countDocuments(); // get total documents in the blogs collection 
        if (skip > count || !blogs) {
            err.type = 'Invallid Page';
            return next(err)
        }

        // return response with blogs, total pages, and current page
        res.status(200).json({
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

async function readBlog(req, res, next) {
    const id = req.params.id;

    try {

        const blog = await blogModel.findOneAndUpdate({ _id: id }, { $inc: { read_count: 1 } }, { returnDocument: 'after' }).populate({ path: 'authorDetails' })

        if (!blog) {
            err.type = 'Invallid ID';
            return next(err)
        }

        res.status(200).json({
            status: "success",
            message: "Blog Fetched Sucessfully!!!",
            data: { blod: blog }
        });

    } catch (err) {
        err.type = 'No Data';
        next(err)
    }

}

async function searchBlog(req, res, next) {
    limit = 20
    const requiredData = matchedData(req, { includeOptionals: false }); // get the validated data from request
    page = (requiredData.page) ? requiredData.page : 1; //check if pagenumber is passed

    requiredData.state = (requiredData.state) ? requiredData.state : BlogState; // check if state is passed else asign value to it

    delete requiredData.page // delete the page key from the request
    const skip = (page - 1) * limit;

    try {
        const blogs = await blogModel.find(requiredData).sort({ read_count: 1, reading_time: 1, timestamp: 1 }).populate({ path: 'authorDetails' }) // execute query with page and limit values
            .limit(limit * 1)
            .skip(skip)
            .exec();

        const count = await blogModel.countDocuments(); // get total documents in the blogs collection 
        if (skip > count || !blogs) {
            err.type = 'Invallid Page';
            return next(err)
        }

        // return response with blogs, total pages, and current page
        res.status(200).json({
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



module.exports = {
    fetchAllBlog,
    readBlog,
    searchBlog
}