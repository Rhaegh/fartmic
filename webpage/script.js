function send() {
	const Http = new XMLHttpRequest();
	const url='http://192.168.72.131:8080/test';
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
	  console.log(Http.responseText)
	}
};