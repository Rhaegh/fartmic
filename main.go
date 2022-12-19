package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os/exec"
)

type Scheetjes struct {
	Id   string
	Name string
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

func writetodatabase() {
	data := Scheetjes{
		Id:   "1",
		Name: "Rens",
	}

	file, _ := json.MarshalIndent(data, "", " ")

	_ = ioutil.WriteFile("/home/pi/fartmic/data/db.json", file, 0644)
}

func main() {
	writetodatabase()
	recordbutton()
}
