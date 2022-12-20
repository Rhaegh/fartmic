package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func listener() {
	http.HandleFunc("/recordbutton", record)
	http.HandleFunc("/savebutton", save)
	err := http.ListenAndServe("192.168.72.131:8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func record(w http.ResponseWriter, req *http.Request) {
	startrecorder()
	fmt.Println("Recorder")
}

func save(w http.ResponseWriter, req *http.Request) {
	fmt.Println("saver")
}

func startrecorder() {
	app := "python"
	arg0 := "recorder.py"
	arg1 := "0"

	cmd := exec.Command(app, arg0, arg1)
	stdout, err := cmd.Output()
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println(string(stdout))
}

func main() {
	listener()
}
