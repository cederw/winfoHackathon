'use strict';

var api = 'http://api.meaningcloud.com/sentiment-2.0';
var apikey = '86c9cad7a70104cf17825ce97daa9ad6';
var txt = '';
var model = 'general_es';  // general_en


$(document).ready(function() {
	$(".emoteText").on('input', function(e) {
		var textValue = e.target.value;
		determineEmote(textValue);
	});
});

function determineEmote(textValue) {
	alert(textValue);
	$.post(api,
    {
        txt: textValue,
        model: model,
        key: apikey,
        of: "json"
    },
    function(response, status){
    	console.log(response);

        alert("Status: " + status);
        var score = response.score_tag;
        var irony = response.irony;
        var subjectivty = response.irony;
        var confidence = response.confidence;
    });
}



