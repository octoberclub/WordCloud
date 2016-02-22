var main = function () {
  $.getJSON("topics.json", function (response) {

     var words = [];
     var maxSteps=6.0
	     
	     
     var json={ topics: sortByPopularityDescending(response.topics) };


     for (var i in json.topics) {
       var topic=json.topics[i];

       var sentimentStyle="neutral";     
       if(topic.sentimentScore>60) sentimentStyle="positive";
       if(topic.sentimentScore<40) sentimentStyle="negative";

       var popularity=parseFloat(Math.floor(parseFloat(i)/(maxSteps-1))+1.0);

       words[words.length]= {
          text:   topic.label,
          weight: popularity,
          html:   {class: sentimentStyle },
          handlers : {click: function() {
            var zz = topic;
                return function() {
                    var output="<p>Information on topic: &quot;" + zz.label + "&quot;</p></br><ul>";
		    output+="<li>Total Mentions: " + zz.volume + "</li>";
		    output+="<li>Positive Mentions: " + ((zz.sentiment.positive !== undefined) ? zz.sentiment.positive : "0") + "</li>";
		    output+="<li>Neutral Mentions: "  + ((zz.sentiment.neutral !== undefined)  ? zz.sentiment.neutral  : "0") + "</li>";
		    output+="<li>Negative Mentions: " + ((zz.sentiment.negative !== undefined) ? zz.sentiment.negative : "0") + "</li>";
		    output+="</ul>";
		    $("#topicprops").html(output);
                }
            }()}
       };
     }

     $("#wordcloud").jQCloud( words, {
       classPattern: null,
       steps: maxSteps, 
       fontSize : { 
         from: 0.1,
	 to: 0.02
       }
     })
  });
};


function sortByPopularityDescending(topics) {
  return topics.sort(function(a,b) { 
      return parseFloat(a.volume) - parseFloat(b.volume);
  });
}

$(document).ready(main);

