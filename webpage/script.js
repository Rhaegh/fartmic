function send() {
	countdown()
	const Http = new XMLHttpRequest();
	const url='http://192.168.72.131:8080/recordbutton';
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
	  console.log(Http.responseText)
	}
};

timeLeft = 10;

function countdown() {
	timeLeft--;
	document.getElementById("seconds").innerHTML = String( timeLeft );
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	}
};

setTimeout(countdown, 1000);