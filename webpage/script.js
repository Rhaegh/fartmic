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

function countdown(){
	var timeleft = 10;
	var downloadTimer = setInterval(function(){
	if(timeleft <= 0){
		clearInterval(downloadTimer);
		document.getElementById("countdown").innerHTML = "Finished";
	} else {
		document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
	}
	timeleft -= 1;
	}, 1000);
}