var input = document.getElementById("input");
var output = document.getElementById("output");
var socket = new WebSocket("ws://localhost:8080/echo");

socket.onopen = function () {
	output.innerHTML += "Status: Connected\n";
};

socket.onmessage = function (e) {
	output.innerHTML += "Server: " + e.data + "\n";
};

function isOpen(ws) { return ws.readyState === ws.OPEN }

function send() {
	if (!isOpen(socket)) return;
		socket.send(input.value);
		input.value = "";
}