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
var subjectivity = "";
var confidence = "";
var agreement = "";
var message = "";

$(document).ready(function() {

    $(className).popover({
        placement: 'right', 
        title: determineTitle(score),
        content: determineImage(score), 
        html: true
    });
    $(className).popover("show");
    
    $(className).on('input', function(e) {
		var textValue = e.target.value;

        var isPunctuation = checkForPunctuation(textValue);
            
        if(isPunctuation == true) {
            determineEmote(textValue);
        }

	});
    //http://walterceder.me/winfoProject/dontbemean.php/?user=irene&comm=reasfadfdsf&rate=P&ir=ironic&sub=subjective&agr=yes&conf=100 
    //User, comm, rate = score_Tag, ir = ironic, sub = subjective, agr = agreement, conf = confidence
});

function setHiddenValues() {

    $('#rate').val(score);
    $('#ir').val(irony);
    $('#sub').val(subjectivity);
    $('#agr').val(agreement);
    $('#conf').val(confidence);

    console.log($('#sub').val());
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
        subjectivity = response.subjectivity;
        confidence = response.confidence;
        agreement = response.agreement;
        
        $(className).data('bs.popover').options.content = determineImage(score);
        $(className).data('bs.popover').options.title = determineTitle(score);
        $(className).popover("show");
        
        setHiddenValues();
    });
}

function checkForPunctuation(text) {
    var isPunctuation = true;

    if(text.length > 0) {
        var punctuation = [",", ".", "?", "!", ";", ":", "-", "{", "}", "(", ")", "[", "]", '"', "'", " ", "\n"];

        var index = text.length;

        var lastChar = text.substring(index - 1);
    
        var result = $.inArray(lastChar, punctuation);

        isPunctuation = (result == -1) ? false : true;
    } 

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

function determineTitle(score) {
    switch (score) {
        case "P+":
            return "Extremely Positive";
            break;
         case "P":
            return "Positive";
            break;
        case "N":
            return "Negative";
            break;
        case "N+":
            return "Extremely Negative";
            break;
        default:
            return "Neutral";
            break;
    }
}

