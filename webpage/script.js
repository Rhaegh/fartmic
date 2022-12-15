var input = "Test";
var output = document.getElementById("output");
var socket = new WebSocket("ws://192.168.72.131:8080/todo");

socket.onopen = function () {
  output.innerHTML += "Status: Connected\n";
};

socket.onmessage = function (e) {
  output.innerHTML += "\nServer: " + e.data + "\n";
};

function send() {
  socket.send(input.value);
  input.value = "";
}