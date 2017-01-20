function highlight(text) {

	var paragraphs = document.getElementsByTagName('p');

	for(var j=0; j<paragraphs.length; j++){
	    var inputText = paragraphs[j];
	    var innerHTML = inputText.innerHTML;
	    var textIndexes = allIndexOf(innerHTML, text);

	    for(var i=0; i<textIndexes.length; i++){
			var index=textIndexes[i];
	        innerHTML = innerHTML.substring(0,index) + 
	        	"<span class='highlight'>" + 
	        	innerHTML.substring(index,index+text.length) + 
	        	"</span>" + 
	        	innerHTML.substring(index + text.length);

	        inputText.innerHTML = innerHTML;
	        textIndexes = allIndexOf(innerHTML, text);
		}
	}

	addSearchListener();
}

function allIndexOf(str, toSearch) {
    var indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
    return indices;
}

function clearSearch() {
	var pattern = /<span class="highlight">(.*?)<\/span>/g
	
	var inputText = document.body;
    var innerHTML = inputText.innerHTML;

    var highlights = pattern.exec(innerHTML);

    if(highlights){
    	innerHTML = innerHTML.replace(pattern, pattern.exec(innerHTML)[1]);
    	inputText.innerHTML = innerHTML;
	}
}

function addSearchListener () {
	document.getElementById("search-input").addEventListener("change", function(event){
    	event.preventDefault();
		var searchText = event.target.value;
		
		clearSearch();
		highlight(searchText);
	})
}

$(document).ready(function() {
	addSearchListener();

	Array.from(document.getElementsByClassName("likes")).forEach(
	    function(element, index, array) {
	        element.addEventListener("click", function(event, element){
	        	event.preventDefault();

				var numberElement = this.getElementsByClassName('number')[0];
				var number = parseInt(numberElement.innerHTML);
				numberElement.innerHTML = number+1;
			});
	    }
	);

	
});