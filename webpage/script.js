showbuttons = true
timedone = false
showhide()

function send() {
	setTimeout(countdown, 1000)
	showbuttons = false
	showhide()
	const Http = new XMLHttpRequest();
	const url='http://192.168.72.131:8080/recordbutton';
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
	  console.log(Http.responseText)
	}
};

timeLeft = 5;
function countdown() {
	timeLeft--;
	document.getElementById("seconds").innerHTML = String( timeLeft );
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	}else {
		timedone = true
		showhide()
	}
};

function showhide(){
	if (showbuttons === false){
		document.getElementById("fartbutton").style.display = 'none';
		document.getElementById("clock").style.display = '';
	}else {
		document.getElementById("fartbutton").style.display = '';
		document.getElementById("clock").style.display = 'none';
	}
	if (timedone === true){
		document.getElementById("fartbutton").style.display = 'none';
		document.getElementById("clock").style.display = 'none';
		document.getElementById("savebutton").style.display = '';
		document.getElementById("name").style.display = '';
	}else {
		document.getElementById("fartbutton").style.display = '';
		document.getElementById("clock").style.display = '';
		document.getElementById("savebutton").style.display = 'none';
		document.getElementById("name").style.display = 'none';
	}
}
