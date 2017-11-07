var exports = module.exports = {};
var rest = require('./rest.js');

var access_token = "5895005199.41c3302.220fbb4187454431aebce8a6c8bc5368";

exports.get_user_media = function(callback){
	rest.get('https://api.instagram.com/v1/users/self/media/recent?count=50&access_token='+access_token,{},function(media,err){
    if(err){
      console.log(err);
      callback({success:false,data:'Failed to get user media'});
      logger.log('instagram','',{success:false, data: 'Failed to get media '+access_token+' - '+err});
    }
    media = sort_media(media);
    callback({success:true,data:media});
	});	
}

function sort_media(m){
  var media = [];
  for(var i=0; i<m.data.length; i++){
    var caption = "";
    var hashtags = [];
    var users = [];
    var links = [];
    var likes = m.data[i].likes.count;
    var video = false;
    var link = false;
    var hide = false;
    var carousel_media = [];
    var carousel = false;

    if(m.data[i].caption != null){
      caption = m.data[i].caption.text;
    }

    if(m.data[i].videos != undefined){
      video = m.data[i].videos.standard_resolution.url;
    }

    if(m.data[i].type == 'carousel'){
      for(var j=0; j<m.data[i].carousel_media.length; j++){
        if(m.data[i].carousel_media[j].images != undefined){
          carousel_media.push(m.data[i].carousel_media[j].images.standard_resolution.url);
        }
        if(m.data[i].carousel_media[j].videos != undefined){
          carousel_media.push(m.data[i].carousel_media[j].videos.standard_resolution.url);
        }
      }
      carousel = true;
    }

    media.push({
      source : m.data[i].images.standard_resolution.url,
      caption : caption,
      hide : hide,
      link : link,
      likes : likes,
      video : video,
      carousel : carousel,
      carousel_media : carousel_media,
      width:m.data[i].images.standard_resolution.width,
      height:m.data[i].images.standard_resolution.height,
    });
  }
  return media;
}