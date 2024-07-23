package main

import(
	"log"
    "net/http"   
	"database/sql"
	"encoding/json"
)

type Employee struct {
    Iden string `json:"Iden"`
    PositionNumber string `json:"PositionNumber"`
    FullName       string `json:"FullName"`
    IDCard         string `json:"IDCard"`
    Position       string `json:"Position"`
    BirthDate      string `json:"BirthDate"`
    StartDate      string `json:"StartDate"`
    DateBm         string `json:"DateBm"`
    DateBc         string `json:"DateBc"`
    DateJm         string `json:"DateJm"`
    DateJc         string `json:"DateJc"`
    Date20Years    string `json:"Date20Years"`
    RetireDate     string `json:"RetireDate"`
}

type GovOffice struct {
    Identity string `json:"Identity"`
    PositionNumber string `json:"PositionNumber"`
    FullName       string `json:"FullName"`
    IDCard         string `json:"IDCard"`
    Position       string `json:"Position"`
    Level          string `json:"Level"`
    Agency         string `json:"Agency"`
    Salary         string `json:"Salary"`
    Telephone      string `json:"Telephone"`
    BirthDate      string `json:"BirthDate"`
    StartDate      string `json:"StartDate"`
    RetireDate     string `json:"RetireDate"`
    Study          string `json:"Study"`
    DateBm         string `json:"DateBm"`
    DateBc         string `json:"DateBc"`
    DateTm         string `json:"DateTm"`
    DateTc         string `json:"DateTc"`
    DatePm1        string `json:"DatePm1"`
    DatePc2        string `json:"DatePc2"`
    DateMvm3       string `json:"DateMvm3"`
    DateIPJ        string `json:"DateIPJ"`
    DateTrain      string `json:"DateTrain"`
    DateVinai      string `json:"DateVinai"`
    DateMove       string `json:"DateMove"`
}
//ค้นหารายชื่อพนักงานและเจ้าหน้าที่โดยใช้ชื่อจริง หรือ เลขบัตร ปชช.ค้นหาก็ได้
func searchEmployeeHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.ServeFile(w, r, "./static/html/search.html")
        return
    }

    if err := r.ParseForm(); err != nil {
        log.Println("Error parsing form data:", err)
        http.Error(w, "Error parsing form data: "+err.Error(), http.StatusInternalServerError)
        return
    }

    searchValue := r.FormValue("searchInput")

    log.Printf("Searching for employee or gov office with FullName or IDCard containing: %s\n", searchValue)

    var employee Employee
    var govOffice GovOffice

    query := `SELECT NumPosi, id, username, ID_CARD, JB_Position, Birthday, StartJB, Bm, Bc, Jm, Jc, TWY, retried 
              FROM Employee 
              WHERE username LIKE ? OR ID_CARD LIKE ?`
    err := db.QueryRow(query, "%"+searchValue+"%", "%"+searchValue+"%").Scan(
        &employee.PositionNumber, &employee.Iden, &employee.FullName, &employee.IDCard, 
        &employee.Position, &employee.BirthDate, &employee.StartDate, &employee.DateBm, 
        &employee.DateBc, &employee.DateJm, &employee.DateJc, &employee.Date20Years, &employee.RetireDate)

    if err != nil {
        if err == sql.ErrNoRows {
            log.Println("Employee not found, searching in GovOffice")

            query = `SELECT Govid, GovNumPosi, Govusername, GovID_CARD, GovJB_Position, GovLev, GovAgen, GovSalary, GovTel, GovBirthday, 
                             GovStartJB, Govretried, GovStudy, GovBm, GovBc, GovTm, GovTc, GovPm1, GovPc2, GovMvm3, GovIPJ, Govtrain, Govvinai, Govmove 
                     FROM GovOffice 
                     WHERE Govusername LIKE ? OR GovID_CARD LIKE ?`
            err := db.QueryRow(query, "%"+searchValue+"%", "%"+searchValue+"%").Scan(
                &govOffice.Identity, &govOffice.PositionNumber, &govOffice.FullName, &govOffice.IDCard, 
                &govOffice.Position, &govOffice.Level, &govOffice.Agency, &govOffice.Salary, 
                &govOffice.Telephone, &govOffice.BirthDate, &govOffice.StartDate, &govOffice.RetireDate, 
                &govOffice.Study, &govOffice.DateBm, &govOffice.DateBc, &govOffice.DateTm, &govOffice.DateTc, 
                &govOffice.DatePm1, &govOffice.DatePc2, &govOffice.DateMvm3, &govOffice.DateIPJ, 
                &govOffice.DateTrain, &govOffice.DateVinai, &govOffice.DateMove)

            if err != nil {
                if err == sql.ErrNoRows {
                    log.Println("GovOffice not found")
                    w.Header().Set("Content-Type", "application/json")
                    json.NewEncoder(w).Encode(struct{ NoData bool }{true})
                } else {
                    log.Println("Error querying GovOffice:", err)
                    http.Error(w, "Error querying database: "+err.Error(), http.StatusInternalServerError)
                }
                return
            }

            log.Println("GovOffice found")
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(govOffice)
        } else {
            log.Println("Error querying Employee:", err)
            http.Error(w, "Error querying database: "+err.Error(), http.StatusInternalServerError)
        }
        return
    }

    log.Println("Employee found")
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(employee)
}
