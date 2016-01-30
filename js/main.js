$(document).ready(function() {
	$(".emoteText").on('input', function(e) {
		var textValue = e.target.value;
		determineEmote(textValue);
	});
});

function determineEmote(textValue) {
	alert(textValue);
}

