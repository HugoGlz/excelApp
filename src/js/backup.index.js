document.onreadystatechange = init;

var template = undefined;

function init () {
   if (document.readyState !== "complete") return;
  
   if( template === undefined)
	   callService('GET', '../template.html',loadTemplate);
   
	callService('GET', 'http://localhost:9000/data/', showData);
}

function loadTemplate(request){
	template = request.responseText;
}

function showData(request){
	var content = document.getElementById("content");
	
	/*
	var json = {
		records: [
			{id:1,name:"jugo"},
			{id:2,name:"toto"},
			{id:3,name:"tucan"}
		]
	}
	*/
	
	var json = eval(request.responseText);
	console.log(json);
	
	var html = Mustache.render(template, json);
	
    content.innerHTML += html;
}

function callService(method, endPoint, callback){
	console.log(endPoint);
	var request = new XMLHttpRequest();
    request.open(method, endPoint, false); 
    request.send(null);
   
    if (request.status === 200){
		callback(request);
    }
 }