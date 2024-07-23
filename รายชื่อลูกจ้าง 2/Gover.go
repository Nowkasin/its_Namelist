package main

import(
	"fmt"
	"net/http"
	"log"
	"strconv"
	"net/url"
)

//กรอกข้อมูลเจ้าหน้าที่ลงในฟอร์มเพื่อบันทึกลงฐานข้อมูล
func submitGovHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.Redirect(w, r, "/", http.StatusSeeOther)
        return
    }

    if err := r.ParseForm(); err != nil {
        log.Println("Error parsing form data:", err)
        http.Error(w, "Error parsing form data: "+err.Error(), http.StatusInternalServerError)
        return
    }

    countPeopleStr := r.FormValue("countPeople")
    countPeople, err := strconv.Atoi(countPeopleStr)
    if err != nil {
        log.Println("Error converting countPeople:", err)
        http.Error(w, "Invalid number of people", http.StatusBadRequest)
        return
    }

    for i := 1; i <= countPeople; i++ {
        fullName := r.FormValue(fmt.Sprintf("Govusername%d", i))
        idCard := r.FormValue(fmt.Sprintf("GovID_CARD%d", i))
        position := r.FormValue(fmt.Sprintf("GovJB_Position%d", i))
        positionNumber := r.FormValue(fmt.Sprintf("GovNumPosi%d", i))
        Level := r.FormValue(fmt.Sprintf("GovLev%d", i))
        Agency := r.FormValue(fmt.Sprintf("GovAgen%d", i))
        SALARY := r.FormValue(fmt.Sprintf("GovSalary%d", i))
        Telephone := r.FormValue(fmt.Sprintf("GovTel%d", i))
        birthDate := r.FormValue(fmt.Sprintf("GovBirthday%d", i))
        startDate := r.FormValue(fmt.Sprintf("GovStartJB%d", i))
        retireDate := r.FormValue(fmt.Sprintf("Govretried%d", i))
        STUDY := r.FormValue(fmt.Sprintf("GovStudy%d", i))
        dateBm := r.FormValue(fmt.Sprintf("GovBm%d", i))
        dateBc := r.FormValue(fmt.Sprintf("GovBc%d", i))
        dateTm := r.FormValue(fmt.Sprintf("GovTm%d", i))
        dateTc := r.FormValue(fmt.Sprintf("GovTc%d", i))
        datePm1 := r.FormValue(fmt.Sprintf("GovPm1%d", i))
        datePc2 := r.FormValue(fmt.Sprintf("GovPc2%d", i))
        dateMVM3 := r.FormValue(fmt.Sprintf("GovMvm3%d", i))
        dateIpj := r.FormValue(fmt.Sprintf("GovIPJ%d", i))
        Trainny := r.FormValue(fmt.Sprintf("Govtrain%d", i))
        VINAI := r.FormValue(fmt.Sprintf("Govvinai%d", i))
        MOVE := r.FormValue(fmt.Sprintf("Govmove%d", i))

        // Check for duplicates for ID_CARD and username
        if duplicate, _ := checkDuplicateGov("GovID_CARD", idCard); duplicate {
            http.Redirect(w, r, "/static/html/submit.html?error="+url.QueryEscape("เลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว")+"&type=gov", http.StatusSeeOther)
            return
        }
        if duplicate, _ := checkDuplicateGov("Govusername", fullName); duplicate {
            http.Redirect(w, r, "/static/html/submit.html?error="+url.QueryEscape("ชื่อนี้นี้มีอยู่ในระบบแล้ว")+"&type=gov", http.StatusSeeOther)
            return
        }

        insertQuery := "INSERT INTO GovOffice (Govusername, GovID_CARD, GovJB_Position, GovNumPosi, GovLev, GovAgen, GovSalary, GovTel, GovBirthday, GovStartJB, Govretried, GovStudy, GovBm, GovBc, GovTm, GovTc, GovPm1, GovPc2, GovMvm3, GovIPJ, Govtrain, Govvinai, Govmove) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        _, err = db.Exec(insertQuery, fullName, idCard, position, positionNumber, Level, Agency, SALARY, Telephone, birthDate, startDate, retireDate, STUDY, dateBm, dateBc, dateTm, dateTc, datePm1, datePc2, dateMVM3, dateIpj, Trainny, VINAI, MOVE)
        if err != nil {
            log.Println("Error inserting data:", err)
            http.Error(w, "Error inserting data: "+err.Error(), http.StatusInternalServerError)
            return
        }
    }

    http.Redirect(w, r, "/static/html/submit.html?success=true", http.StatusSeeOther)
}