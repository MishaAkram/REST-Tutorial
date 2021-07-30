const express = require('express')
const router = express.Router()
const verify=require('./verifyToken');

router.get('/',verify, (request,response) => {
     response.json({
         posts:{
             title:"my first post",
             description:"randon data you should'nt access"
         }
     });
})

module.exports = router