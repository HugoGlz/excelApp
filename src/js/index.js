
const mustache = require('mustache');
const xhr = require('xhr');

document.onreadystatechange = init;

var template = undefined;

function init () {
   if (document.readyState !== "complete") return;
  
   if( template === undefined)
	   callService('GET', '../template.html', null, loadTemplate);
   
	callService('GET', 'http://localhost:9000/data/', null, showData);
}

function loadTemplate(request){
	template = request.responseText;
}

function showData(request){
//	var content = document.getElementById("content");
	var content = document.querySelector("#content");	
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
	
	var html = mustache.render(template, json);
	
    content.innerHTML += html;
}

function callService(method, endPoint, data, callback){
	
	if(data === null) data={};
	
	xhr({
		body: data,
		uri: endPoint,
		method: method
	}, function(err, resp, body){
		console.log(body);
	})
	
	/*
	var request = new XMLHttpRequest();
    request.open(method, endPoint, false); 
    request.send(null);
   
    if (request.status === 200){
		callback(request);
    }
	*/
 }
