package main

import (
	"fmt"
	"net/http"
	"os/exec"
)

type farts struct {
	ID   int    `json: "id"`
	Name string `json: "name"`
	Date string `json: "date"`
}

func recordbutton() {
	http.HandleFunc("/recordbutton", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			startrecorder()
			fmt.Println("recorder function called")
			return
		}
	})

	http.ListenAndServe(":8080", nil)
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
	recordbutton()
}
