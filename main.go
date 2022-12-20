package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
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
	name := req.URL.Query().Get("name")
	fmt.Println(name)
}

func writedatabase() {
	f, err := os.OpenFile("/home/pi/fartmic/data/data.csv", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println(err)
		return
	}
	w := csv.NewWriter(f)
	w.Write([]string{"a", "b", "c"})
	w.Flush()
}

func readdatabase() {
	file, err := os.Open("/home/pi/fartmic/data/data.csv")
	if err != nil {
		fmt.Println(err)
	}
	reader := csv.NewReader(file)
	records, _ := reader.ReadAll()

	fmt.Println(records[1])
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
	//listener()
	//writedatabase()
	readdatabase()
}
