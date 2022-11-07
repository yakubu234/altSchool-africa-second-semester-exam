const { check, validationResult } = require("express-validator");

exports.blog = [
    check("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("fBlog title is required"),
    check("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Blog description is required"),
    check("tags")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Blog tag is required"),
    check("body")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("The Blog content is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({
                status: "error",
                message: errors.array(),
                data: null
            });
        next();
    },
];