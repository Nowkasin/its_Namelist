package main

import(
	"net/http" 
	"log"
	"encoding/json"
)


func UpdateGov(w http.ResponseWriter, r *http.Request) {
    log.Println("Received request to update Gov data")

    var govData GovOffice
    err := json.NewDecoder(r.Body).Decode(&govData)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    log.Println("Decoded Gov data:", govData)

    // Check if required fields are missing
    if govData.Identity == "" {
        log.Println("Missing ID field")
        http.Error(w, "Missing ID field", http.StatusBadRequest)
        return
    }

    // Prepare update statement
    stmt, err := db.Prepare(`
        UPDATE GovOffice SET 
        Govusername=?, GovID_CARD=?, GovJB_Position=?, GovNumPosi=?, GovLev=?, GovAgen=?, GovSalary=?,
        GovTel=?, GovBirthday=?, GovStartJB=?, Govretried=?, GovStudy=?,
        GovBm=?, GovBc=?, GovTm=?, GovTc=?, GovPm1=?, GovPc2=?, GovMvm3=?, GovIPJ=?,
        Govtrain=?, Govvinai=?, Govmove=?
        WHERE Govid=?
    `)
    if err != nil {
        log.Println("Error preparing statement:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    // Execute update statement
    _, err = stmt.Exec(
        govData.FullName, govData.IDCard, govData.Position, govData.PositionNumber,
        govData.Level, govData.Agency, govData.Salary, govData.Telephone,
        govData.BirthDate, govData.StartDate, govData.RetireDate, govData.Study,
        govData.DateBm, govData.DateBc, govData.DateTm, govData.DateTc,
        govData.DatePm1, govData.DatePc2, govData.DateMvm3, govData.DateIPJ,
        govData.DateTrain, govData.DateVinai, govData.DateMove,
        govData.Identity,
    )
    if err != nil {
        log.Println("Error executing statement:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    log.Println("Update successful")

    // Return success response
    w.Header().Set("Content-Type", "application/json")
    response := map[string]interface{}{"success": true}
    json.NewEncoder(w).Encode(response)
}