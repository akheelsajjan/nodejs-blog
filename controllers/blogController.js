const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('../libs/responseLib')
const time = require('../libs/libs'); 
const check = require('../libs/checklib');
const logger = require('../libs/logger');
//Importing the model here 
const BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) => {
    console.log(req.user);
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
               logger.error(err.message, "getAllblog",10);
                let  apiResponse = response.generate(true, "failed to find blog", 500, null)
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info("blog not found", "blogController: getAllblogs",10)
                let  apiResponse = response.generate(true, "Blog not found", 404, null)
                res.send(apiResponse);
                
            } else {
                logger.info("blog found successfully", "blogController: getAllblogs",0)
                let  apiResponse = response.generate(false, "Blog found", 200, result);
                res.send(apiResponse);
               
            }
        })
}// end get all blogs

/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
        } else if (check.isEmpty(result)) { // using the libray
            logger.info("failed to find blog", "view Blog by id",10);
            let  apiResponse = response.generate(true, "Blog not found", 404, null)
            res.send(apiResponse);
        } else {
            logger.info("blog found succesfully ", "view by id",0)
            let  apiResponse = response.generate(false, "Blog found", 200, result);
            res.send(apiResponse);

        }
    })
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
        } else if (result == undefined || result == null || result == '') {
            let  apiResponse = response.generate(true, "Blog not found", 404, null)
            res.send(apiResponse);
        } else {
            let  apiResponse = response.generate(false, "Blog found", 200, result);
            res.send(apiResponse);

        }
    })
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            console.log(err)
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
        } else if (result == undefined || result == null || result == '') {
            let  apiResponse = response.generate(true, "Blog not found", 404, null)
            res.send(apiResponse);
        } else {
            let  apiResponse = response.generate(false, "Blog found", 200, result);
            res.send(apiResponse);

        }
    })
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
                res.send(apiResponse);
        } else if (result == undefined || result == null || result == '') {
            let  apiResponse = response.generate(true, "Blog not found", 404, null)
            res.send(apiResponse);
        } else {
            let  apiResponse = response.generate(false, "Blog updated", 200, result);
            res.send(apiResponse);

        }
    })
}



/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) { let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
            console.log(err)
         
        } else if (result == undefined || result == null || result == '') {
            let  apiResponse = response.generate(true, "Blog not found", 404, null)
            res.send(apiResponse);
        } else {
            let  apiResponse = response.generate(false, "Blog deleted", 200, result);
            res.send(apiResponse);

        }
    })
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: time.getLocalTime(),
        lastModified: today
    }) // end new blog model

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
        } else {
            let  apiResponse = response.generate(false, "Blog created", 200, result);
            res.send(apiResponse);
        }
    }) // end new blog save
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            let  apiResponse = response.generate(true, "failed to find blog", 500, null)
            res.send(apiResponse);
        } else if (result == undefined || result == null || result == '') {
           
        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    let  apiResponse = response.generate(true, "failed to save", 500, null)
                    res.send(apiResponse);
                }
                else {
                    let  apiResponse = response.generate(false, "views incremented", 200, result);
                    res.send(apiResponse);

                }
            });// end result

        }
    })
}




module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}