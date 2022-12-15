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

keys.forEach(key => {
	key.addEventListener('click', () => playNote(key))
	showhide()
})

document.addEventListener('keydown', e => {
	if (e.repeat) return
	const key = e.key
	const whiteKeyIndex = WHITE_KEYS.indexOf(key)
	const blackKeyIndex = BLACK_KEYS.indexOf(key)

	if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
	if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

function playNote(key) {
	if (pianoenabled === true) {
		const noteAudio = document.getElementById(key.dataset.note)
		keyforArray(key)
		showTextwhileplaying()
		pressButton()
		noteAudio.currentTime = 0
		noteAudio.play()
		key.classList.add('active')
		noteAudio.addEventListener('ended', () => {
			key.classList.remove('active')
		})
	}
}

function keyforArray(key) {
	pressednotes = key.dataset.note
	notes.push(pressednotes)
}

function addjson() {
	httprequest()
	wait(500);
	location.reload()
}

function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
	  end = new Date().getTime();
   }
 }

function showTextwhileplaying() {
	notes.forEach(function (item, index, array) {
		if (array.length <= 39) {
			pre.textContent = ('Recording... ' + songname)
		} else {
			pre.textContent = ('Maximaal aantal van 40 noten bereikt.')
			pianoenabled = false
		}
	})
}

function clearbutton() {
	notes = []
	delay = []
	pianoenabled = true
	showTextwhileplaying()
	pre.textContent = ('')
}

function pressButton() {
	if (timerControl.innerHTML == "Start") {
	  timerControl.innerHTML = "Stop";
	  start = Date.now();
	  timeElapsed = (start - end);
	} else {
	  timerControl.innerHTML = "Start";
	  end = Date.now();
	  timeElapsed = (end - start);
	}
	delay.push(timeElapsed)
  }

  function getsongname(){
	if (document.getElementById("name").value.trim() == "") {
		pre.textContent = ('Vul een naam in.')
	}else {
		songname = document.getElementById("name").value;
		document.getElementById("name").value = "";
		pianoenabled = true
		pre.textContent = ('Speel muziek')
		showtextbox = false
		showbuttons = true
		showhide()
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
		document.getElementById("name").style.display = 'none';
		document.getElementById("namebutton").style.display = 'none';
		document.getElementById("choosebutton").style.display = 'none';
		document.getElementById("selectNumber").style.display = 'none';
		document.getElementById("deletebutton").style.display = 'none';
		document.getElementById("device").style.display = 'none';
	}else {
		document.getElementById("name").style.display = '';
		document.getElementById("namebutton").style.display = '';
		document.getElementById("choosebutton").style.display = '';
		document.getElementById("selectNumber").style.display = '';
		document.getElementById("deletebutton").style.display = '';
		document.getElementById("device").style.display = '';
	}
	if (showbuttons === false){
		document.getElementById("submitbutton").style.display = 'none';
		document.getElementById("clearbutton").style.display = 'none';
	}else {
		document.getElementById("submitbutton").style.display = '';
		document.getElementById("clearbutton").style.display = '';
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
