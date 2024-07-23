package main

import(
	"fmt"
	"net/http"
	"log"
	"strconv"
	"net/url"
)

//กรอกข้อมูลลูกจ้างลงในฟอร์มเพื่อบันทึกลงฐานข้อมูล
func submitHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.Redirect(w, r, "/", http.StatusSeeOther)
        return
    }

    if err := r.ParseForm(); err != nil {
        log.Println("Error parsing form data:", err)
        http.Error(w, "Error parsing form data: "+err.Error(), http.StatusInternalServerError)
        return
    }

    numPeopleStr := r.FormValue("numPeople")
    numPeople, err := strconv.Atoi(numPeopleStr)
    if err != nil {
        log.Println("Error converting numPeople:", err)
        http.Error(w, "Invalid number of people", http.StatusBadRequest)
        return
    }

    for i := 1; i <= numPeople; i++ {
        positionNumber := r.FormValue(fmt.Sprintf("NumPosi%d", i))
        fullName := r.FormValue(fmt.Sprintf("username%d", i))
        idCard := r.FormValue(fmt.Sprintf("ID_CARD%d", i))
        position := r.FormValue(fmt.Sprintf("JB_Position%d", i))
        birthDate := r.FormValue(fmt.Sprintf("Birthday%d", i))
        startDate := r.FormValue(fmt.Sprintf("StartJB%d", i))
        dateBm := r.FormValue(fmt.Sprintf("Bm%d", i))
        dateBc := r.FormValue(fmt.Sprintf("Bc%d", i))
        dateJm := r.FormValue(fmt.Sprintf("Jm%d", i))
        dateJc := r.FormValue(fmt.Sprintf("Jc%d", i))
        date20Years := r.FormValue(fmt.Sprintf("TWY%d", i))
        retireDate := r.FormValue(fmt.Sprintf("retried%d", i))

        // Check for duplicates for ID_CARD and username
        if duplicate, _ := checkDuplicate("ID_CARD", idCard); duplicate {
            http.Redirect(w, r, "/static/html/submit.html?error="+url.QueryEscape("เลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว")+"&type=employee", http.StatusSeeOther)
            return
        }
        if duplicate, _ := checkDuplicate("username", fullName); duplicate {
            http.Redirect(w, r, "/static/html/submit.html?error="+url.QueryEscape("ชื่อนี้นี้มีอยู่ในระบบแล้ว")+"&type=employee", http.StatusSeeOther)
            return
        }

        insertQuery := "INSERT INTO Employee (NumPosi, username, ID_CARD, JB_Position, Birthday, StartJB, Bm, Bc, Jm, Jc, TWY, retried) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        _, err := db.Exec(insertQuery, positionNumber, fullName, idCard, position, birthDate, startDate, dateBm, dateBc, dateJm, dateJc, date20Years, retireDate)
        if err != nil {
            log.Println("Error inserting data:", err)
            http.Error(w, "Error inserting data: "+err.Error(), http.StatusInternalServerError)
            return
        }
    }

    http.Redirect(w, r, "/static/html/submit.html?success=true", http.StatusSeeOther)
}