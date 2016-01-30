'use strict';

var api = 'http://api.meaningcloud.com/sentiment-2.0';
var apikey = '86c9cad7a70104cf17825ce97daa9ad6';
var txt = '';
var model = 'general_es';  // general_en

var className = ".emoteText";

var image = "<img src='img/testImage.png'>";


$(document).ready(function() {
	$(className).on('input', function(e) {
		var textValue = e.target.value;

		determineEmote(textValue);
        $(className).popover({
            placement: 'right', 
            content: image, 
            html: true
        });
        $(className).popover("show");
	});
});

function determineEmote(textValue) {
	console.log(textValue);
	$.post(api,
    {
        txt: textValue,
        model: model,
        key: apikey,
        of: "json"
    },
    function(response, status){
        console.log("Status: " + status);
    	console.log(response);

        var score = response.score_tag;
        var irony = response.irony;
        var subjectivty = response.irony;
        var confidence = response.confidence;
    });
}

function checkIfSpace(text) {
    var index = text.length;
    var lastChar = text.substring(index - 1);
    alert(lastChar);
}




