var main = function () {
  $.getJSON("topics.json", function (response) {

console.log(response);     
var json = response;

     var words = [];
     var steps=6.0;

     for (var i in json.topics) {
       var topic=json.topics[i];

       var sentimentStyle="neutral";
       if(topic.sentimentScore>60) sentimentStyle="positive";
       if(topic.sentimentScore<40) sentimentStyle="negative";
       var popularity=Math.floor(i/steps)+1;

       words[words.length]= {
          text:   topic.label,
          weight: popularity,
          html:   {class: sentimentStyle },
          handlers : {click: function() {
            var zz = topic;
                return function() {
                    console.log("Clicked on topic " +  zz.label + ", json="  + JSON.stringify(zz));
                }
            }()}
       };
     }

     $("#wordcloud").jQCloud( words ), {
       steps: 6,
       fontSize: {
         from: 0.1,
         to: 0.02
       }
     } 
  });
};

$(document).ready(main);

