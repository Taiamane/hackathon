package main

import (
	"encoding/json"
	"net/http"
)

type responseMessage struct {
	Message string `json:"message"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed) // 405 Method Not Allowed
		return
	}

	w.Header().Set("Content-Type", "application/json")
	query := r.URL.Query()
	name := query.Get("name")
	if name == "" {
		w.WriteHeader(http.StatusBadRequest) // 400 Bad Request
		return
	}

	bytes, err := json.Marshal(responseMessage{
		Message: "Hello, " + name + "-san",
	})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError) // 500 Internal Server Error
		return
	}

	w.Write(bytes)
}

func main() {
	http.HandleFunc("/hello", handler)
	http.ListenAndServe(":8000", nil)
}
