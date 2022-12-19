package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			fmt.Println("Gelukt")
			return
		}
	})

	http.ListenAndServe(":8080", nil)
}
