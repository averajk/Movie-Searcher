window.onload = init;
var count = 0;
function init() {
var mybutton = document.getElementById("mybutton");

mybutton.onclick = function clickMe() {												//handles the search button.
	var searchMe = document.createElement("script");
	var myTitle = document.getElementById("myTitle");
	var myTitleFixed = new String(myTitle.value);
	
	myTitleFixed = myTitleFixed.replace(/\s+/gi,"+");							   //sets the src url to accept input with spaces
	var newSrc = "http://www.omdbapi.com/?apikey=232c0384"+"&t="+myTitleFixed;     //sets the src url to accept input with spaces
	
	if(document.getElementById("rMovie").selected){								   //specifies the type of content to search
		newSrc += "&type=" + document.getElementById("rMovie").value;
	}
	else if(document.getElementById("rSeries".selected)){
		newSrc += "&type=" + document.getElementById("rSeries").value;
	}
	else{
		newSrc += "&type=" + document.getElementById("rEpisode").value;
	}
	
	
	if(document.getElementById("xmlMe").selected){
		searchMe.src = newSrc; //+ "&r=xml";
		document.head.appendChild(searchMe);
		function myCallBack(){
			var request = new XMLHttpRequest();
			request.open("GET", newSrc);
			request.onload = function (){
				if (request.status = 200) {
					var response = request.responseText;
					var createme = document.createElement("div");
					createme.innerHTML = "<br>" + response + "<br>" ;
					document.body.appendChild(createme);
				}
			}
			request.send(null);
		}
	}
	
	else{
	searchMe.src = newSrc + "&callback=myJSONcallback"
	document.head.appendChild(searchMe);
	}
}
/*	if (clickMe == true){
		var picMe = document.createElement("script");
		var myPic = document.getElement
}
*/
}

/*   Working Versiom
function myCallBack(someArray) {
		var myObject = someArray;
		var myObjectL = Object.keys(myObject).length;
			for(var i = 0; i < myObjectL; i++){
				var divMaker = document.createElement("div");
				divMaker.setAttribute("id",Object.keys(myObject)[i]);
				var entry = new String(Object.entries(myObject)[i]);
				var fixedEntry = entry.replace( /,/, ": ");
				var myProperty = document.createTextNode(fixedEntry);
				divMaker.appendChild(myProperty);
				document.body.appendChild(divMaker);
			}
*/


function myJSONcallback(someArray) {
	var myObject = someArray;
	var myObjectL = Object.keys(myObject).length;      //This lists all properties of the movie
	//var myObjectL = 7; 							   //This lists first 8 properties of the movie
	var divMaker = document.createElement("div");
		for(var k = 0; k < myObjectL; k++){
			var groupMetaData = document.createElement("li");
			groupMetaData.setAttribute("id",Object.keys(myObject)[k]);
			var entry = Object.keys(myObject)[k] + ": " + Object.values(myObject)[k];
			var myProperty = document.createTextNode(entry);
			groupMetaData.appendChild(myProperty);
			divMaker.appendChild(groupMetaData);
			}
	document.body.appendChild(divMaker);
	count++;
	divMaker.setAttribute("id","Movie"+[count]+"");
}