var main = function () {
  $.getJSON("topics.json", function (response) {
    $("body").append("<p> topic label count : " + response.topics.length + "</p>");


        var output="<ul>";
        for (var i in response.topics) {
            output+="<li>" + response.topics[i].label+"</li>";
        }

        output+="</ul>";
        document.getElementById("nav").innerHTML=output;
 
  });
};

$( document ).ready(main);
