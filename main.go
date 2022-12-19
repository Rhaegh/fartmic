package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
)

type Scheetjes struct {
	ID   string
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

func writedatabase() {
	records := []Scheetjes{
		{"1", "Scheetje van Giel"},
	}
	file, err := os.Create("/home/pi/fartmic/data/database.csv")
	defer file.Close()
	if err != nil {
		log.Fatalln("failed to open file", err)
	}
	w := csv.NewWriter(file)
	defer w.Flush()
	// Using Write
	for _, record := range records {
		row := []string{record.ID, record.Name}
		if err := w.Write(row); err != nil {
			log.Fatalln("error writing record to file", err)
		}
	}
}

func main() {
	writedatabase()
	recordbutton()
}
