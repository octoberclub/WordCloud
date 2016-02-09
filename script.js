



// github user finder example
function loadWordCloud(username) {

	$.getJSON("topics.json", function(json) {
		console.log(json); // this will show the info it in firebug console
		var words = JSON.parse(json );

		
	});

			
}

$(document).ready(function() {
	loadWordCloud();
});
