const { Module } = require('module');
const mogoose = require('mongoose');
const schema = mogoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
},{timestamps: true})

const Blog = mogoose.model('Blog',blogSchema);

module.exports = Blog;