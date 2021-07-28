const express =require('express');
const router =express.Router();
//ROUTES

router.get('/',(req,res)=>{
    res.send('we are on Posts');
});

module.exports = router;