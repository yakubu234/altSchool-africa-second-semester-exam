const express = require('express')

module.exports = (error, req, res, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', error)

    switch (error.type) {
        case 'Redirect':
            res.redirect('error.html')
            break;
        case 'Not Found':
            res.status(404).send(error)
            break;
        case 'Identical Email':
            res.status(400).json({
                "status": "error",
                "message": "This email address already exist in the database",
                "data": null
            })
            break;
        case 'Incorrect Email':
            res.status(401).json({
                "status": "error",
                "message": "Invalid Email Supplied",
                "data": null
            })
            break;
        case 'Incorrect password':
            res.status(401).json({
                "status": "error",
                "message": "Incorrect password Supplied",
                "data": null
            })
            break;
        case 'Invalid Token Supplied':
            res.status(401).json({
                "status": "error",
                "message": "Invalid Token Supplied",
                "data": null
            })
            break;
        case 'Identical Blog Title':
            res.status(401).json({
                "status": "error",
                "message": "Identical Blog Title",
                "data": null
            })
            break;
        case 'Invallid Page':
            res.status(401).json({
                "status": "error",
                "message": "This page does not exist",
                "data": null
            })
            break;
        case 'No Data':
            res.status(401).json({
                "status": "error",
                "message": "Record does not exist",
                "data": null
            })
            break;

        case 'Invallid ID':
            res.status(401).json({
                "status": "error",
                "message": "Blog ID supplied does not match any record",
                "data": null
            })
            break;

        default:
            res.status(400).send(error)
            break;
    }

    next() // next is required to call next middleware if any
}