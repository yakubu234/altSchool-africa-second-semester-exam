const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const blog = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'Blog title must be unique']
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    state: {
        type: String,
        trim: true,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    reading_time: {
        type: String,
        trim: true,
        required: true
    },
    read_count: {
        type: Number,
        trim: true,
        required: true
    },
    tags: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    }

}, { timestamps: true });



blog.virtual('authorDetails', {
    ref: 'user', //The Model to use
    localField: 'author', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
});

blog.set('toObject', { virtuals: true });
blog.set('toJSON', { virtuals: true });

module.exports = mongoose.model('blog', blog);