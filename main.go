package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gocarina/gocsv"
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

type NotUsed struct {
	Name string
}

type Client struct { // Our example struct, you can use "-" to ignore a field
	Id            string  `csv:"client_id"`
	Name          string  `csv:"client_name"`
	Age           string  `csv:"client_age"`
	NotUsedString string  `csv:"-"`
	NotUsedStruct NotUsed `csv:"-"`
}

func writedatabase() {

	clientsFile, err := os.OpenFile("/home/pi/fartmic/data/data.csv", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		panic(err)
	}
	defer clientsFile.Close()

	clients := []*Client{}

	if err := gocsv.UnmarshalFile(clientsFile, &clients); err != nil { // Load clients from file
		panic(err)
	}
	for _, client := range clients {
		fmt.Println("Hello", client.Name)
	}

	if _, err := clientsFile.Seek(0, 0); err != nil { // Go to the start of the file
		panic(err)
	}

	clients = append(clients, &Client{Id: "12", Name: "John", Age: "21"}) // Add clients
	clients = append(clients, &Client{Id: "13", Name: "Fred"})
	clients = append(clients, &Client{Id: "14", Name: "James", Age: "32"})
	clients = append(clients, &Client{Id: "15", Name: "Danny"})
	csvContent, err := gocsv.MarshalString(&clients) // Get all clients as CSV string
	//err = gocsv.MarshalFile(&clients, clientsFile) // Use this to save the CSV back to the file
	if err != nil {
		panic(err)
	}
	fmt.Println(csvContent) // Display all clients as CSV string
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
	writedatabase()
}
