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
    try{
          const post=await Post.findById(req.params.id);
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

module.exports = router;