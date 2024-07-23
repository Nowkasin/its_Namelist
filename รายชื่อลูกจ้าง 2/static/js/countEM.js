let alertShownIDCard = false; // ตัวแปรสถานะการแจ้งเตือนเลขบัตรประชาชน
let alertShownBirthday = false; // ตัวแปรสถานะการแจ้งเตือนวันเกิด

function generateForms() {
    const numPeople = document.getElementById('numPeople').value;
    const formsContainer = document.getElementById('formsContainer');
    formsContainer.innerHTML = '';

    var currentYear = new Date().getFullYear();
    var startYear = currentYear + 543; // ปี พ.ศ. ปัจจุบัน
    var endYear = startYear - 100; // สร้าง dropdown ปี ย้อนหลัง 100 ปี

    for (let i = 1; i <= numPeople; i++) {
        const personForm = `
        <div class="card mb-3">
            <div class="card-header">
                ข้อมูลคนที่ ${i}
            </div>
            <div class="card-body">
                <div class="form-row tx">
                    <div class="form-group col-md-2">
                        <label for="NumPosi${i}">เลขที่ตำแหน่ง</label>
                        <input type="text" class="form-control" id="NumPosi${i}" name="NumPosi${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="username${i}">ชื่อ - สกุล</label>
                        <input type="text" class="form-control" id="username${i}" name="username${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="ID_CARD${i}">เลขบัตรประชาชน</label>
                        <input type="text" class="form-control" id="ID_CARD${i}" name="ID_CARD${i}" placeholder="1-1111-11111-11-1" onblur="checkDuplicateIDCard(this)" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="JB_Position${i}">ตำแหน่งงาน</label>
                        <input type="text" class="form-control" id="JB_Position${i}" name="JB_Position${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="Birthday${i}">เกิด</label>
                        <input type="text" class="form-control" id="Birthday${i}" name="Birthday${i}" placeholder="02/06/2545" required onblur="formatBirthday(this)">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="StartJB${i}">รับราชการ</label>
                        <input type="text" class="form-control" id="StartJB${i}" name="StartJB${i}" placeholder="02/06/2545" required onblur="formatBirthday(this)">
                    </div>
                </div>
                <h3 class="tx">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h3>
                <div class="form-row tx">
                    <div class="form-group col-md-2">
                        <label for="BmYear${i}">บ.ม.</label>
                        <select class="form-control" id="BmYear${i}" name="Bm${i}" required></select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="BcYear${i}">บ.ช.</label>
                        <select class="form-control" id="BcYear${i}" name="Bc${i}" required></select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="JmYear${i}">จ.ม.</label>
                        <select class="form-control" id="JmYear${i}" name="Jm${i}" required></select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="JcYear${i}">จ.ช.</label>
                        <select class="form-control" id="JcYear${i}" name="Jc${i}" required></select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="TWYYear${i}">ประเภท 4 ครบ 20 ปี</label>
                        <select class="form-control" id="TWYYear${i}" name="TWY${i}" required></select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="retriedYear${i}">เกษียณ</label>
                        <select class="form-control" id="retriedYear${i}" name="retried${i}" required></select>
                    </div>
                </div>
            </div>
        </div>
        `;
        formsContainer.innerHTML += personForm;

        // สร้าง dropdown ปี พ.ศ. สำหรับฟอร์มที่สร้างขึ้นใหม่
        createYearDropdown(`BmYear${i}`, startYear, endYear);
        createYearDropdown(`BcYear${i}`, startYear, endYear);
        createYearDropdown(`JmYear${i}`, startYear, endYear);
        createYearDropdown(`JcYear${i}`, startYear, endYear);
        createYearDropdown(`TWYYear${i}`, startYear, endYear);
        createYearDropdown(`retriedYear${i}`, startYear, endYear);
    }

    // เพิ่ม event listener ให้กับฟิลด์เลขบัตรประชาชนและวันเกิดทุกฟิลด์
    document.querySelectorAll('input[id^="ID_CARD"]').forEach(input => {
        input.addEventListener('blur', () => formatIDCard(input));
    });
    document.querySelectorAll('input[id^="Birthday"]').forEach(input => {
        input.addEventListener('blur', () => formatBirthday(input));
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    generateForms(); // เรียกครั้งแรกเมื่อหน้าเว็บถูกโหลด
});

function createYearDropdown(elementId, startYear, endYear) {
    const select = document.getElementById(elementId);
    for (let year = startYear; year >= endYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    }
}

