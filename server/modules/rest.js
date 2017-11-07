var exports = module.exports = {};

var http = require("http");
var https = require("https");
var request = require("request");

exports.post = function(uri,mybody,callback){
    var options = {
        uri: uri,
        json:true,
        qs:{},
        body: mybody
    };
    request.post(options, function(error, response, body){
    	if(error){
    		console.log(error);
    	}
      callback(body);
    });
}

exports.post2 = function(url,formData){
    request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });
}

exports.get = function(uri,qs,callback){
    var options = {
        uri: uri,
        headers: {
            "Accept": "application/json",
        },
        json:true,
        qs:qs,
    };
    request(options, function(error, response, body){
    	if(error){
    		console.log(error);
    	}
    	callback(body);
    });	
}