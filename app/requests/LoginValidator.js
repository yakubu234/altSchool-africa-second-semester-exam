const { check, validationResult } = require("express-validator");

exports.login = [

    check("email", "Your email is not valid")
    .isEmail()
    .not()
    .isEmpty()
    .normalizeEmail(),
    check("password", "Password fiel is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("your password should have minimum of 8 characters"),
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