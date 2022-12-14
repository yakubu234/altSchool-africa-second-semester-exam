const { check, oneOf, validationResult } = require("express-validator");

exports.update = [
    check("blog_id", 'blog_id is required to edit a blog')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("blog_id must have more than 3 characters"),
    check('body').exists().optional({ checkFalsy: true }).escape(),
    check('description').exists().optional({ checkFalsy: true }).escape(),
    check('title').exists().optional({ checkFalsy: true }).escape(),
    check('tags').exists().optional({ checkFalsy: true }).escape(),
    check('state').exists().isIn(['published', 'draft'])
    .optional({ checkFalsy: true })
    .escape()
    .withMessage({ 'state only accept values like': ['published', 'draft'] }),
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