'use strict';

var api = 'http://api.meaningcloud.com/sentiment-2.0';
var apikey = '86c9cad7a70104cf17825ce97daa9ad6';
var txt = '';
var model = 'general_es';  // general_en

$("button").click(function(){
    $.post(api,
    {
        txt: message,
        model: model,
        key: apikey,
        of: "json"
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        var response = jQuery.parseJSON(data);
        var score = response.score_tag;
        var irony = response.irony;
        var subjectivty = response.irony;
        var confidence = response.confidence;
    });
});