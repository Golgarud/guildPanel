$(function(){
	$(".check-auth").on("click", function(e){
		var checked = $(this).prop("checked");
		console.log(checked);
		if (checked)
		{
			$("#auth-form").animate({
				"width": "90rem"
			},
			500,
			function()
			{
				$("#auth-form .insc-only").css({
					"visibility": "visible",
					"height": "auto"
				});
			});
		}
		else
		{

		}

	})
});
