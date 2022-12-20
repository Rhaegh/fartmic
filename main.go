package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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

func writedata() {
	fartdata := farts{
		ID:   2,
		Name: "Loe",
		Date: "Datumpje",
	}
	finaljson, err := json.Marshal(fartdata)
	if err != nil {
		panic(err)
	}
	// If the file doesn't exist, create it, or append to the file
	f, err := os.OpenFile("/home/pi/fartmic/data/db.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := f.Write([]byte(finaljson)); err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}

func readdata() {
	bytes, err := ioutil.ReadFile("/home/pi/fartmic/data/db.json")

	if err != nil {
		fmt.Println("Unable to load config file!")
		return
	}

	var config farts
	err = json.Unmarshal(bytes, &config)

	if err != nil {
		fmt.Println("JSON decode error!")
		return
	}

	fmt.Println(config) // {50.3 ~/plugins/ {500 200 500 500}}
}

func main() {
	writedata()
	readdata()
	recordbutton()
}
