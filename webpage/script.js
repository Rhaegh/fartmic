const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
const Http = new XMLHttpRequest();
let pre = document.querySelector('#msg pre')
let device = document.querySelector('#device pre')

let notes = [];
var pianoenabled = false;
var showtextbox = true;
var showbuttons = false;
let start=0;
let end=0;
let timeElapsed;
var delay = [];
var songname;
var chosensong;


function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
	  end = new Date().getTime();
   }
 }
 
  function getchosensong(){
	if (document.getElementById("selectNumber").value.trim() == "Kies een liedje") {
		pre.textContent = ('kies een nummer.')
	}else {
		chosensong = document.getElementById("selectNumber").value;
		pre.textContent = ('Gekozen nummer wordt gespeeld')
		showtextbox = false
		delay.shift()
		let delaystring = "0," + delay.toString()
		var notesstring = notes.join('')
	
		var url = "https://socket.proftaak.duckdns.org/trigger/?filter=" + chosensong
		Http.open("GET", url);
		Http.send();
		Http.onreadystatechange = (e) => {
		  console.log(Http.responseText)
		}

	}
  }

  function showhide(){
	if (showtextbox === false) {
		document.getElementById("choosebutton").style.display = 'none';
	}else {
		document.getElementById("choosebutton").style.display = '';
	}
  }

  function deletechosensong(){
	if (document.getElementById("selectNumber").value.trim() == "Kies een liedje") {
		pre.textContent = ('kies een nummer.')
	}else {
		delay.shift()
		let delaystring = "0," + delay.toString()
		var notesstring = notes.join('')
		chosensong = document.getElementById("selectNumber").value;

		var url = "https://api.proftaak.duckdns.org/delete/?song=" + chosensong
		Http.open("GET", url);
		Http.send();
		
		Http.onreadystatechange = (e) => {
		console.log(Http.responseText)
		}
		wait(500);
		location.reload()
	}
  }

  function httprequest(){
	delay.shift()
	let delaystring = "0," + delay.toString()
	var notesstring = notes.join('')

	var url = "https://api.proftaak.duckdns.org//post/?delay=" + delaystring + "&name=" + songname+ "&sequence=" + notesstring + "&trigger="
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange = (e) => {
	  console.log(Http.responseText)
	
	}
  }


  $("#name").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#namebutton").click();
    }
});


setInterval(function() {
	getDevices()	
}, 10000);
getDevices()
async function getDevices(){
	const devices_url = "https://socket.proftaak.duckdns.org/devices/"
		const response = await fetch(devices_url);
		devices = await response.json()
		let apidata = []
			try {
			devicesdata  = JSON.parse(devices)
		} 	catch(e) {
			devicesdata = devices.nummer
		}
	device.textContent = ('Aantal verbonden devices: ' + devicesdata)
}

var apiempty = true
async function getAPI(){
	if(apiempty === true){
		const songlist_url = "https://api.proftaak.duckdns.org/songlist/"
		const response = await fetch(songlist_url);
		data = await response.json()
		let apidata = []
			try {
			apidata  = JSON.parse(data)
		} 	catch(e) {
			apidata = data.songs
		}
		var select = document.getElementById("selectNumber");
		var options = apidata
		for(var i = 0; i < options.length; i++) {
			var opt = options[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}
		apiempty = false
	}
}
