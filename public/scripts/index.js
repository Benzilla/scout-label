$(document).ready(function(){
	var index = 0;
	var num_data = 1000;
	var loca = "Manchester_uk";
	
	init();
	function init(){
		add_listeners();
		//load_location();
	}

	function load_location(){
		index = 0;
		init_data(function(data){
			update_ui(data.data,data.num_data)
		});
	}

	function init_data(callback){
		ajax('/api/get_data',{index:index,location:loca},function(data){
			num_data = data.num_data;
			callback(data);
		});
	}

	function add_listeners(){
		$('.yes').click(function(){
			classify(1);
		});

		$('.no').click(function(){
			classify(0);
		});

		$('.next').click(function(){
			index++;
			get_data();
		});

		$('.back').click(function(){
			index--;
			get_data();
		});

		$('.set').click(function(){
			var val = parseInt($('#index-input').val());
			index = val;
			get_data();
		});

		$('.load').click(function(){
			loca = $('#location-input').val()
			load_location();
		})
	}

	function classify(linked){
		ajax('/api/classify',{index:index,linked:linked,location:loca},function(data){
			index++;
			get_data();
		});
	}

	function get_data(){
		if(index>num_data-1){
			index = 0;
		}
		if(index<0){
			index = num_data-1;
		}
		ajax('/api/get_data',{index:index,location:loca},function(data){
			update_ui(data.data,data.num_data);
		});
	}

	function ajax(endpoint,data,callback){
		$.ajax({
      url: endpoint,
      type:"POST",
      dataType: "json",
      data:data,
      success: function(res) {
          callback(res)
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log('error ' + textStatus + " " + errorThrown);
      }
    });
	}

	function update_ui(data,num_data){
		console.log(data);
		$('#index').text(index+'/'+(num_data-1)+'.');
		$('.venue').text(data.name+', '+data.location);
		$('.question').text(data.name+','+data.location+' = '+data.account.instagram+'? Prediction: '+(data.prediction*100).toFixed(2)+'%');
		$('#instagram-account').text(data.account.instagram);
		$('#instagram-link').text(data.account.instagram);
		$('#instagram-link').attr('href','https://www.instagram.com/'+data.account.instagram);
		$('#external-link').attr('href',data.account.external_url);
		$('#external-link').text(data.account.external_url);
		$('.profile-picture').attr('src',data.account.profile_picture);
		$('.profile-full-name').text(data.account.full_name);
		$('.profile-followers').text('Followers: '+data.account.followers);
		$('.profile-bio').text(data.account.bio);
		$('.profile-media').empty();
		$('.button-prompt').html('Does the account <b>'+data.account.instagram+'</b> belong to <b>'+data.name+', '+data.location+'</b> ?')
		var length = 9;
		if(data.account.media.length<length){
			length = data.account.media.length;
		}
		for(var i=0; i<length; i++){
			$('.profile-media').append('<img class="media" src="'+data.account.media[i].images.thumbnail.url+'"/>');
		}
		if(data.linked == 1){
			$('#insta-half').addClass('linked');
		}
		else{
			$('#insta-half').removeClass('linked');
		}
	}

});