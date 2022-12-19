package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

type Scheetjes struct {
	ID   string `json:"ID"`
	Name string `json:"Name"`
	Date string `json:"Date"`
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

func checkFile(filename string) error {
	_, err := os.Stat(filename)
	if os.IsNotExist(err) {
		_, err := os.Create(filename)
		if err != nil {
			return err
		}
	}
	return nil
}

func getfartid() {
	// Let's first read the `config.json` file
	content, err := ioutil.ReadFile("/home/pi/fartmic/data/db.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}

	// Now let's unmarshall the data into `payload`
	var payload Scheetjes
	err = json.Unmarshal(content, &payload)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}

	// Let's print the unmarshalled data!
	log.Printf("ID: %s\n", payload.ID)
	log.Printf("user: %s\n", payload.Name)
	log.Printf("status: %t\n", payload.Date)
}

func writetodatabase() {
	filename := "/home/pi/fartmic/data/db.json"
	err := checkFile(filename)
	if err != nil {
		fmt.Println(err)
	}

	file, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
	}

	data := []Scheetjes{}

	json.Unmarshal(file, &data)
	currenttime := time.Now()
	currentdatetime := currenttime.Format("2006.01.02 15:04:05")
	newStruct := &Scheetjes{
		ID:   "1",
		Name: "Rens",
		Date: currentdatetime,
	}

	data = append(data, *newStruct)

	// Preparing the data to be marshalled and written.
	dataBytes, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
	}

	err = ioutil.WriteFile(filename, dataBytes, 0644)
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	getfartid()
	recordbutton()
}
