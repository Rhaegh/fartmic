showbuttons = true
showclock = false
timedone = false
showhide()

function send() {
	showbuttons = false
	showclock = true
	showhide()
	const Http = new XMLHttpRequest();
	const url='http://192.168.72.131:8080/recordbutton';
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
	  console.log(Http.responseText)
	}
	setTimeout(countdown, 1000)
};

timeLeft = 5;
function countdown() {
	timeLeft--;
	document.getElementById("seconds").innerHTML = String( timeLeft );
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	}else {
		timedone = true
		showclock = false
		showbuttons = false
		showhide()
	}
};

function save(){
	if (document.getElementById("name").value.trim() == "") {
		pre.textContent = ('Vul een naam in.')
	}else {
		username = document.getElementById("name").value;
		document.getElementById("name").value = "";
		const Http = new XMLHttpRequest();
		const url='http://192.168.72.131:8080/savebutton?name=' + username;
		Http.open("GET", url);
		Http.send();
		
		Http.onreadystatechange = (e) => {
		  console.log(Http.responseText)
		}
		location.reload();
	}
}

function showhide(){
	if (showbuttons === false){
		document.getElementById("fartbutton").style.display = 'none';

	}else {
		document.getElementById("fartbutton").style.display = '';
	}
	if (showclock === false){
		document.getElementById("clock").style.display = 'none';
	}else{
		document.getElementById("clock").style.display = '';
	}
	if (timedone === true){
		document.getElementById("savebutton").style.display = '';
		document.getElementById("name").style.display = '';
	}else {
		document.getElementById("savebutton").style.display = 'none';
		document.getElementById("name").style.display = 'none';
	}
}
