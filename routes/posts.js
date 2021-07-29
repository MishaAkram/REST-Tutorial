const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
//ROUTES


//get back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
});
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {

        const savedPost = await post.save()
        res.json(savedPost);
    }
    catch (err) {
        res.json({ message: err });
        console.log("error", err);
    }
});
//delete a post
router.delete('/:id', async (req, res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.id });
        res.json(removePost);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//update a post
router.patch('/:id', async (req, res) => {
    try{
          const updatePost=await Post.updateOne({_id:req.params.id},{
              $set:{
                  title:req.body.title,
                  
              }
          });
          res.json(updatePost);
      }
      catch (err) {
          res.json({ message: err });
      }
});

module.exports = router;