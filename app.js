const express = require('express');
require('dotenv').config();
const BlogRoutes = require('./routes/BlogRoutes');
const UserRoutes = require('./routes/UserRoute');
const bodyParser = require('body-parser');
const errorHandler = require('./app/middleware/ErrorHandler')
const mongoose = require('./config/database.config.js');
const PORT = process.env.APP_PORT;
const JWT_SECRETE = process.env.JWT_SECRETE;



const app = express();
app.set('secretKey', JWT_SECRETE); // jwt secret token


app.use(bodyParser.urlencoded({ extended: true })) /**parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.json()) /**parse requests of content-type - application/json*/

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "This is the landing page of blog API" });
});

// public route
app.use('/user', UserRoutes);
app.use('/blog', BlogRoutes);

/** Standard error handling */
app.use(errorHandler)

/** catch all routes that are not defined and send response */
app.get('*', (req, res) => {
    res.status(404).json({
        "status": "error",
        "message": "Not Found",
        "data": null
    });
});

/**listen for requests */
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});