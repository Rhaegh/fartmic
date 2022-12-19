package main

import (
	"fmt"
	"net/http"
)

func listener() {
	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			fmt.Println("Gelukt")
			return
		}
	})

	http.ListenAndServe(":8080", nil)
}

func main() {
	listener()
}
