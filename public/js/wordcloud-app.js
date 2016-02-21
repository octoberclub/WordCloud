var main = function () {
  $.getJSON("wordcloud.json", function (response) {
    console.log("res=", response);
     $("#wordcloud").jQCloud( JSON.parse(response) );
  });
};

$(document).ready(main);
