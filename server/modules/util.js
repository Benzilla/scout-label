var exports = module.exports = {};

var logs_enabled = true;
var fs = require('fs');

exports.save = function(obj,location,callback){
	obj = JSON.stringify(obj);
	fs.writeFile(location, obj, 'utf8', function(err) {
	    if (err){
	    	console.log(err);
	    	callback();
	    }
	    	callback();
	    }
	);
}

exports.load_json = function(path,callback){
	fs.readFile(path, 'utf8', function (err, data) {
	    if (err){
	    	console.log(err);
	    }
	    var obj = JSON.parse(data);
	    callback(obj);
	});
}

exports.get_data = function(location,index,callback){
	var fp = location_to_fp(location);
	exports.load_json('C:/dev/sites/Scout/Scout-Bot/data/'+fp,function(data){
		callback({data:data[index],num_data:data.length});
	});	
}

exports.classify = function(location,index,linked,callback){
	var fp = location_to_fp(location);
	exports.load_json('C:/dev/sites/Scout/Scout-Bot/data/'+fp,function(data){
		data[index].linked = JSON.parse(linked);
		console.log(index,data[index].name);
		exports.save(data,'C:/dev/sites/Scout/Scout-Bot/data/'+fp,function(){
			callback();
		})
	});	
}

function location_to_fp(location){
	return location.toLowerCase()+'.json';
}
