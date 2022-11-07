const { check, validationResult } = require("express-validator");

exports.register = [
    check("first_name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("first name must have more than 3 characters"),
    check("last_name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("last name must have more than 3 characters"),
    check("phone", "Phone no is required").not().isEmpty().isMobilePhone(),
    check("email", "Your email is not valid")
    .isEmail()
    .not()
    .isEmpty()
    .normalizeEmail(),
    check("password", "Password fiel is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("your password should have minimum of 8 characters")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
    check("confirm_password", "Passwords do not match").custom(
        (value, { req }) => value === req.body.password
    ),
    check("address")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Your address is required"),
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