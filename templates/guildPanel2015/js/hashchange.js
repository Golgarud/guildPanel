function loggIn()
{
	var data = $("#auth-form").serializeArray();
	console.log(data);
}

$(function(){
	$(window).on('hashchange', function(e){
		var $url = window.location.href.split("#")[1];
		switch($url)
		{
			case "loggin":
				loggIn();
			break;
			default:
				console.log($url);
			break;
		}
	});
});