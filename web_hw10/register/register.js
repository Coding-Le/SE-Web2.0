// window.onload = function() {
// 	$('#mybutton').onclick = function() {
$('document').ready(function() {
	$('form:first').submit(function() {
		var error_type = "";
		var isvalid = true;
		if (!$('#username').val().match(/^[a-zA-Z](\w){5,17}$/)) {
			var temp = $('#username').val();
			isvalid = false;
			error_type = "Sorry, your username is invalid!";
		} else if (!$('#number').val().match(/^[1-9][0-9]{7}$/)) {
			isvalid = false;
			error_type = "Sorry, your id number is invalid!";
		} else if (!$('#phoneNumber').val().match(/^[1-9][0-9]{10}$/)) {
			isvalid = false;
			error_type = "Sorry, your phone number is invalid!";
		} else if (!$('#email').val().match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/)) {
			isvalid = false;
			error_type = "Sorry, your email address is invalid!";
		}
		
		if (!isvalid)
			$('#error_clue').html(error_type);

		return isvalid;
	});
});
// 	}
// }