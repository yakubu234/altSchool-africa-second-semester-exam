const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


function generateToken(enc) {
    return jwt.sign({ user: enc }, req.app.get('secretKey'), { expiresIn: '1h' });
}

function create(req, res, next) {
    userModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
    }).then(result => {

        const enc = { _id: result._id, email: result.email }
        const token = jwt.sign({ user: enc }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.status(200).json({
            "status": "success",
            "message": "User Registered Successfully",
            data: [{
                details: result,
                token: token
            }]
        })
    }).catch(err => {
        err.type = 'Identical Email'
        next(err)

    });
}

async function login(req, res, next) {

    try {

        const user = await userModel.findOne({ email: req.body.email })

        if (!(await user.correctPassword(req.body.password, user.password))) {
            error.type = 'Incorrect password'
            return next(error)
        }

        const enc = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: enc }, req.app.get('secretKey'), { expiresIn: '1h' });
        res.status(200).json({
            status: "success",
            message: "User Successfully Created!!!",
            data: {
                user: user,
                token: token
            }
        });

    } catch (e) {
        next(e)
    }

}

function logout(req, res) {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}

async function signout(req, res) {

    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.send({ msg: 'You have been Logged Out' });
        } else {
            res.send({ msg: 'Error' });
        }
    });
}


module.exports = {
    login,
    create
}