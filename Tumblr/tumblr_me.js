// Hosted: https://kellan.000webhostapp.com/tumblr_js/tumblr_me.js

var n_post = -1
var n_anim_speed = 200
var a_posts = []
// Run when document loads
$(document).ready(function() {
	shortcut.add("Down", next_post);
	shortcut.add("Up", previous_post)
	shortcut.add("Left", previous_page)
	shortcut.add("Right", next_page)
	currentPostID = $(".post:first").attr("id")

	$("#searchfield").focus(function(){
		$(this).addClass("tf_focused")
		if($(this).val() == "Type and press enter to search."){
			$(this).val("")
		}
	})
	$("#searchfield").blur(function(){
		$(this).removeClass("tf_focused")
		if($(this).val() == ""){
			$(this).val("Type and press enter to search.")
		}
	})
	$("#loading").fadeTo(200, 0)
	$(".post").each(function(){
		a_posts.push({_id:$(this).attr("id"), _y:$(this).position().top})
	})
	//
	a_posts.sort(sort_posts)
	//
	if(twitter_username != "" && current_page == 1 && String(location.href).indexOf("/search/") < 0){
		get_twitter_status()
	}
	//
	$("#posts").append("<div class=\"entry credit\"><div class=\"icon\"><a href=\"http://jarredbishop.tumblr.com\" class=\"permalink\"></a></div><div class=\"content\"><div class=\"caption\"><p>Theme is by <a href=\"http://jarredbishop.tumblr.com\">Jarred Bishop</a></p></div></div></div>")
	/*
	$(".photo_inner img").fadeTo(0,0)
	$(".photo_inner img").load(function(){
		$(this).fadeTo(n_anim_speed, 1)
		$(this).parent().removeClass("photo_loading")
		$(this).parent().parent().removeClass("photo_loading")
	})
	*/
});
//
function sort_posts(a, b){
	return (a._y - b._y)
}
//
function next_post(){
	scroll_to_post(n_post+1)
	return false
}
//
function previous_post(){
	scroll_to_post(n_post-1)
	return false
}
//
function scroll_to_post(n_){
	if(n_ < 0){
		previous_page()
	}else if(n_ > a_posts.length-1){
		next_page()
	}else{
		$("body").animate({scrollTop:$("#"+a_posts[n_]._id).position().top-10}, n_anim_speed)
		n_post = n_
	}
}
//
function get_twitter_status(){
	$("#twitter").removeClass("hide")
	$.getScript("http://search.twitter.com/search.json?q=from%3A"+twitter_username+"&callback=twitterCallback&rpp=1", function(){});
	$("#twitter .icon a.permalink").click(function(){
		window.location = "http://twitter.com/"+twitter_username
		return false
	})
	$("#twitter p.latest").html("<a href=\"http://twitter.com/"+twitter_username+"\">@"+twitter_username+"</a> from twitter:")
}
//
function twitterCallback(data){
	$("#twitter_status").html(data.results[0]["text"])
}
//
function check_f(){
	alert($("#twitter_status").html())
}
// thanks matthewb: http://matthewbuchanan.name/post/95048088/disabling-diggbar
if ((top !== self) && (document.referrer.match(/http:\/\/digg.com\/\w{1,8}\/*(\?.*)?/))) {
	top.location.replace(self.location.href);
}
