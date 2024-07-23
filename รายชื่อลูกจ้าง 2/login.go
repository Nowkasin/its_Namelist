package main

import(
	"golang.org/x/crypto/bcrypt"
	"html/template"
	"net/http"
	"database/sql"
	"encoding/json"
    "log"
    // "time"
    // "github.com/golang-jwt/jwt/v5"
)

// ลงทะเบียน 
func registerHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        nameuser := r.FormValue("nameuser")
        email := r.FormValue("Email")
        pass := r.FormValue("pass")
        position := r.FormValue("position")

        // Check if email already exists
        var existingEmail string
        err := db.QueryRow("SELECT email FROM Res WHERE email = ?", email).Scan(&existingEmail)
        if err != nil && err != sql.ErrNoRows {
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }

        if existingEmail != "" {
            // If email already exists, return to registration page with error
            http.Error(w, "Email already registered", http.StatusConflict)
            return
        }

        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
        if err != nil {
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }

        _, err = db.Exec("INSERT INTO Res (nameuser, email, pass, position) VALUES (?, ?, ?, ?)", nameuser, email, hashedPassword, position)
        if err != nil {
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }

        http.Redirect(w, r, "/", http.StatusSeeOther)
        return
    }

    tmpl, err := template.ParseFiles("/static/html/main.html")
    if err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    tmpl.ExecuteTemplate(w, "index.html", nil)
}

// Login
func loginHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        nameuser := r.FormValue("nameuser")
        pass := r.FormValue("pass")

        var storedPassword string
        err := db.QueryRow("SELECT pass FROM Res WHERE nameuser = ?", nameuser).Scan(&storedPassword)
        if err != nil {
            http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
            return
        }

        err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(pass))
        if err != nil {
            http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
            return
        }

        session, _ := Store.Get(r, "session-name")
        session.Values["authenticated"] = true
        session.Save(r, w)

        http.Redirect(w, r, "/", http.StatusSeeOther)
        return
    }

    tmpl, err := template.ParseFiles("/static/html/main.html")
    if err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    tmpl.ExecuteTemplate(w, "/static/html/main.html", nil)
}

func checkLoginStatusHandler(w http.ResponseWriter, r *http.Request) {
    // Retrieve the session
    session, err := Store.Get(r, "session-name")
    if err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }

    // Check if the user is authenticated
    loggedIn := session.Values["authenticated"] == true

    // Create a response map with the login status
    response := map[string]bool{"loggedIn": loggedIn}

    // Set the response content type to JSON
    w.Header().Set("Content-Type", "application/json")

    // Encode the response map to JSON and send it
    json.NewEncoder(w).Encode(response)
}

func userProfileHandler(w http.ResponseWriter, r *http.Request) {
    // Retrieve the session from the request
    session, err := Store.Get(r, "session-name")
    if err != nil {
        log.Println("Error retrieving session:", err)
        http.Redirect(w, r, "/login", http.StatusFound)
        return
    }

    // Check if the user is authenticated
    if session.Values["authenticated"] != true {
        log.Println("User not authenticated")
        http.Redirect(w, r, "/login", http.StatusFound)
        return
    }

    // Log the action of serving the profile page
    log.Println("Serving profile page")

    // Serve the profile page
    // No need to capture the return value as http.ServeFile does not return a value
    http.ServeFile(w, r, "./static/html/profile.html")
}
