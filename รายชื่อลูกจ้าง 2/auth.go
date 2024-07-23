package main

import (
    "net/http"
)

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        session, err := Store.Get(r, "session-name")
        if err != nil || session.Values["authenticated"] != true {
            http.Redirect(w, r, "/Login", http.StatusFound)
            return
        }
        next.ServeHTTP(w, r)
    })
}


