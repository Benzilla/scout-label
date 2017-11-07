const express = require('express');
const router = express.Router();

var util = require('../modules/util.js');


router.post('/classify', (req, res) => {
  util.classify(req.body.location,req.body.index,req.body.linked,function(){
  	res.send({status:'complete'});
  })
});

router.post('/get_data', (req, res) => {
  util.get_data(req.body.location,req.body.index,function(data){
  	res.send(data);
  });
});


module.exports = router;