package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"    
    "encoding/json"
    _ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/sessions"
)

var db *sql.DB

func dbConn() {
    var err error
    dbDriver := "mysql"
    dbUser := "root"
    dbPass := ""
    dbName := "Namelist"

    db, err = sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
    if err != nil {
        log.Fatal("Error connecting to database:", err)
    }
    if err = db.Ping(); err != nil {
        log.Fatal("Error verifying connection to database:", err)
    }
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/main.html")
}

func formHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/EMform.html")
}

func GovHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/Govform.html")
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/search.html")
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/login.html")
}

func OfficerHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/Officer.html")
}

func AboutUsHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/aboutUs.html")
}

func showdataEm(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/showdataEm.html")
}

func showdataGov(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./static/html/showdataGov.html")
}

// ตรวจสอบข้อมูลที่ซ้ำจากฟอร์มใน table Employee แล้วแจ้งเป็น alert ออกมา
func checkDuplicate(field, value string) (bool, error) {
    var count int
    query := fmt.Sprintf("SELECT COUNT(*) FROM Employee WHERE %s = ?", field)
    err := db.QueryRow(query, value).Scan(&count)
    if err != nil {
        return false, err
    }
    return count > 0, nil
}
// ตรวจสอบข้อมูลที่ซ้ำจากฟอร์มใน GovOffice แล้วแจ้งเป็น alert ออกมา
func checkDuplicateGov(field, value string) (bool, error) {
    var count int
    query := fmt.Sprintf("SELECT COUNT(*) FROM GovOffice WHERE %s = ?", field)
    err := db.QueryRow(query, value).Scan(&count)
    if err != nil {
        return false, err
    }
    return count > 0, nil
}

// Function to delete a record from the GovOffice table by ID
func deleteGovByID(ID string) error {
    // Prepare the SQL statement for deletion
    stmt, err := db.Prepare("DELETE FROM GovOffice WHERE Govid = ?")
    if err != nil {
        return err
    }
    defer stmt.Close()

    // Execute the SQL statement
    _, err = stmt.Exec(ID)
    return err
}

// Function to delete a record from the Employee table by ID
func deleteEmployeeByID(ID string) error {
    // Prepare the SQL statement for deletion
    stmt, err := db.Prepare("DELETE FROM Employee WHERE id = ?")
    if err != nil {
        return err
    }
    defer stmt.Close()

    // Execute the SQL statement
    _, err = stmt.Exec(ID)
    return err
}

// HTTP handler to delete a GovOffice record
func deleteGovHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        ID string `json:"ID"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Call the deleteGovByID function to delete the record from the database
    err := deleteGovByID(req.ID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := map[string]bool{"success": true}
    json.NewEncoder(w).Encode(response)
}

// HTTP handler to delete an Employee record
func deleteEmployeeHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        ID string `json:"ID"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Call the deleteEmployeeByID function to delete the record from the database
    err := deleteEmployeeByID(req.ID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := map[string]bool{"success": true}
    json.NewEncoder(w).Encode(response)
}

var Store = sessions.NewCookieStore([]byte("something-very-secret"))

func main() {
    dbConn()
    defer db.Close()

    fs := http.FileServer(http.Dir("./static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    http.HandleFunc("/", mainHandler)
    http.HandleFunc("/login", loginHandler)
    http.HandleFunc("/register", registerHandler)
    http.Handle("/เพิ่มข้อมูลลูกจ้าง", AuthMiddleware(http.HandlerFunc(formHandler)))
    http.Handle("/เพิ่มข้อมูลข้าราชการ", AuthMiddleware(http.HandlerFunc(GovHandler)))
    http.Handle("/ค้นหารายชื่อ", AuthMiddleware(http.HandlerFunc(SearchHandler)))
    http.Handle("/check-login-status", AuthMiddleware(http.HandlerFunc(checkLoginStatusHandler)))
    http.HandleFunc("/UserProfile", userProfileHandler)
    http.HandleFunc("/submit", submitHandler)
    http.HandleFunc("/บันทึก", submitGovHandler)
    http.HandleFunc("/เกี่ยวกับเรา", AboutUsHandler)
    http.HandleFunc("/Login", LoginHandler)
    http.HandleFunc("/เจ้าหน้าที่", OfficerHandler)
    http.HandleFunc("/รายละเอียด",searchEmployeeHandler)
    http.HandleFunc("/รายละเอียด/รายละเอียดลูกจ้าง",showdataEm)
    http.HandleFunc("/รายละเอียด/รายละเอียดเจ้าหน้าที่",showdataGov)
    http.HandleFunc("/บันทึกข้อมูลเจ้าหน้าที่", UpdateGov)
    http.HandleFunc("/บันทึกข้อมูลลูกจ้าง", updateEmployee)
    http.HandleFunc("/ลบข้อมูล", deleteGovHandler)
    http.HandleFunc("/ลบข้อมูลพนักงาน", deleteEmployeeHandler)

    log.Println("Server started on: http://localhost:8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal("Error starting server:", err)
    }
}