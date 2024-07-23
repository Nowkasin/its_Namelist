package main

import(
	"net/http" 
	"log"
	"encoding/json"
)

func updateEmployee(w http.ResponseWriter, r *http.Request) {
    log.Println("Received request to update Employee data")

    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var emp Employee
    err := json.NewDecoder(r.Body).Decode(&emp)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    log.Println("Decoded Employee data:", emp)

    // Check if required fields are missing
    if emp.Iden == "" {
        log.Println("Missing ID field")
        http.Error(w, "Missing ID field", http.StatusBadRequest)
        return
    }

    // Prepare update statement
    stmt, err := db.Prepare(`
        UPDATE Employee SET 
        ID_Card=?, JB_Position=?, Birthday=?, StartJB=?, 
        Bm=?, Bc=?, Jm=?, Jc=?, TWY=?, retried=? 
        WHERE Id=?
    `)
    if err != nil {
        log.Println("Error preparing statement:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    // Execute update statement
    res, err := stmt.Exec(
        emp.IDCard, emp.Position, emp.BirthDate, emp.StartDate,
        emp.DateBm, emp.DateBc, emp.DateJm, emp.DateJc,
        emp.Date20Years, emp.RetireDate, emp.Iden,
    )
    if err != nil {
        log.Println("Error executing statement:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    rowsAffected, err := res.RowsAffected()
    if err != nil {
        log.Println("Error getting rows affected:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if rowsAffected == 0 {
        log.Println("No rows were updated")
        http.Error(w, "No rows updated", http.StatusNotFound)
        return
    }

    log.Println("Update successful")

    // Return success response
    w.Header().Set("Content-Type", "application/json")
    response := map[string]interface{}{"success": true, "message": "Employee updated successfully"}
    json.NewEncoder(w).Encode(response)
}