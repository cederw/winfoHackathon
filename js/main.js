'use strict';

var api = 'http://api.meaningcloud.com/sentiment-2.0';
var apikey = '86c9cad7a70104cf17825ce97daa9ad6';
var txt = '';
var model = 'general_en';  // general_en

var className = ".emoteText";

var imageSrc = "Neutral_None.png";
var image = "<img src='img/" + imageSrc + "'>";
var score = "";
var irony = "";
var subjectivty = "";
var confidence = "";
var agreement = "";

$(document).ready(function() {
	$(className).on('input', function(e) {
		var textValue = e.target.value;

        var isPunctuation = checkForPunctuation(textValue);
            
        if(isPunctuation == true) {
            determineEmote(textValue);
            
            setHiddenValues();

            $(className).popover("destroy");
            $(className).popover({
                placement: 'right', 
                content: determineImage(score), 
                html: true
            });

            $(className).popover("show");
        }

	});
    //http://walterceder.me/winfoProject/dontbemean.php/?user=irene&comm=reasfadfdsf&rate=P&ir=ironic&sub=subjective&agr=yes&conf=100 
    //User, comm, rate = score_Tag, ir = ironic, sub = subjective, agr = agreement, conf = confidence


});

function setHiddenValues() {
    $('rate').value = score;
    $('ir').value = irony;
    $('sub').value = subjectivty;
    $('agr').value = agreement;
    $('conf').value = confidence;
}

function determineEmote(textValue) {
    $.post(api,
    {
        txt: textValue,
        model: model,
        key: apikey,
        of: "json"
    },
    function(response, status){
        score = response.score_tag;
        irony = response.irony;
        subjectivty = response.irony;
        confidence = response.confidence;
        agreement = response.agreement;
    });
}

function checkForPunctuation(text) {
    var punctuation = [",", ".", "?", "!", ";", ":", "-", "{", "}", "(", ")", "[", "]", '"', "'", " ", "\n"];

    var index = text.length;
    var lastChar = text.substring(index - 1);
    
    var result = $.inArray(lastChar, punctuation);

    var isPunctuation = (result == -1) ? false : true;
    return isPunctuation;
}


function determineImage(score) {
    switch (score) {
        case "P+":
            imageSrc = "ExtremePositive.png";
            break;
         case "P":
            imageSrc = "Positive.png";
            break;
        case "N":
            imageSrc = "Negative.png";
            break;
        case "N+":
            imageSrc = "ExtremeNegative.png";
            break;
        default:
            imageSrc = "Neutral_None.png";
            break;
    }
    return "<img src='img/" + imageSrc + "'>";
}



