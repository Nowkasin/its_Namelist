let alertShownIDCard = false; // ตัวแปรสถานะการแจ้งเตือนเลขบัตรประชาชน
let alertShownBirthday = false; // ตัวแปรสถานะการแจ้งเตือนวันเกิด

function generateGovForms() {
  const countPeople = document.getElementById("countPeople").value;
  const formsContainer1 = document.getElementById("formsContainer1");
  formsContainer1.innerHTML = "";

  for (let i = 1; i <= countPeople; i++) {
    const personForm = `
        <div class="card mb-3">
            <div class="card-header">
                ข้อมูลคนที่ ${i}
            </div>
            <div class="card-body">
                <div class="form-row tx">
                 <div class="form-group col-md-2">
                        <label for="Govusername${i}">ชื่อ - สกุล</label>
                        <input type="text" class="form-control" id="Govusername${i}" name="Govusername${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovID_CARD${i}">เลขบัตรประชาชน</label>
                        <input type="text" class="form-control" id="GovID_CARD${i}" name="GovID_CARD${i}" placeholder="1-1111-11111-11-1"  onblur="checkDuplicateIDCard(this)" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovJB_Position${i}">ตำแหน่งงาน</label>
                        <input type="text" class="form-control" id="GovJB_Position${i}" name="GovJB_Position${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovNumPosi${i}">เลขที่ตำแหน่ง</label>
                        <input type="text" class="form-control" id="GovNumPosi${i}" name="GovNumPosi${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovLev${i}">ระดับงาน</label>
                        <input type="text" class="form-control" id="GovLev${i}" name="GovLev${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovAgen${i}">หน่วยงาน</label>
                        <input type="text" class="form-control" id="GovAgen${i}" name="GovAgen${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovSalary${i}">เงินเดือน</label>
                        <input type="text" class="form-control" id="GovSalary${i}" name="GovSalary${i}" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovTel${i}">โทรศัพท์มือถือ</label>
                        <input type="text" class="form-control" id="GovTel${i}" name="GovTel${i}"placeholder="000-000-0000" required onblur="formatTel(this)">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovBirthday${i}">เกิด</label>
                        <input type="text" class="form-control" id="GovBirthday${i}" name="GovBirthday${i}" placeholder="02/06/2545" required onblur="formatBirthday(this)">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovStartJB${i}">รับราชการ</label>
                        <input type="text" class="form-control" id="GovStartJB${i}" name="GovStartJB${i}" placeholder="02/06/2545" required onblur="formatBirthday(this)">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovretriedYear${i}">เกษียณ</label>
                        <input type="text" class="form-control" id="GovretriedYear${i}" name="Govretried${i}" placeholder="02/06/2545" required onblur="formatBirthday(this)">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovStudy${i}">การศึกษา</label>
                        <input type="text" class="form-control" id="GovStudy${i}" name="GovStudy${i}"  required>
                    </div>
                </div>
                <h3 class="tx">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h3>
                <div class="form-row tx">
                    <div class="form-group col-md-2">
                        <label for="GovBmYear${i}">บ.ม.</label>
                        <input type="text" class="form-control" id="GovBmYear${i}" name="GovBm${i}" placeholder="2 ธันวาคม 2545" required >
                     </div>
                    <div class="form-group col-md-2">
                        <label for="GovBcYear${i}">บ.ช.</label>
                        <input type="text" class="form-control" id="GovBcYear${i}" name="GovBc${i}" placeholder="2 ธันวาคม 2545" required >
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovTmYear${i}">ท.ม.</label>
                        <input type="text" class="form-control" id="GovTmYear${i}" name="GovTm${i}" placeholder="2 ธันวาคม 2545" required >
                    </div>
                     <div class="form-group col-md-2">
                        <label for="GovTcYear${i}">ท.ช.</label>
                        <input type="text" class="form-control" id="GovTcYear${i}" name="GovTc${i}" placeholder="2 ธันวาคม 2545" required >
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovPmYear${i}">ป.ม.</label>
                        <input type="text" class="form-control" id="GovPmYear${i}" name="GovPm1${i}" placeholder="2 ธันวาคม 2545" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovPcYear${i}">ป.ช.</label>
                        <input type="text" class="form-control" id="GovPcYear${i}" name="GovPc2${i}" placeholder="2 ธันวาคม 2545" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovMvmYear${i}">ม.ว.ม</label>
                        <input type="text" class="form-control" id="GovMvmYear${i}" name="GovMvm3${i}" placeholder="2 ธันวาคม 2545" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="GovipjYear${i}">ร.พ.จ</label>
                        <input type="text" class="form-control" id="GovipjYear${i}" name="GovIPJ${i}" placeholder="2 ธันวาคม 2545" required>
                    </div>
                </div>
                <h3 class="tx">ข้อมูลอื่นๆ</h3>
                <div class="form-row tx">
                    <div class="form-group col-md-4">
                        <label for="Govtrain${i}">ข้อมูลการอบรม</label>
                        <input type="text" class="form-control" id="Govtrain${i}" name="Govtrain${i}"  required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="Govvinai${i}">ข้อมูลโทษทางวินัย</label>
                        <input type="text" class="form-control" id="Govvinai${i}" name="Govvinai${i}"  required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="Govmove${i}">การย้าย หรือ ได้รับการแต่งตั้ง</label>
                        <input type="text" class="form-control" id="Govmove${i}" name="Govmove${i}"  required>
                    </div>
                </div>
            </div>
        </div>
        `;
    formsContainer1.innerHTML += personForm;
  }

  // เพิ่ม event listener ให้กับฟิลด์เลขบัตรประชาชนและวันเกิดทุกฟิลด์
  document.querySelectorAll('input[id^="GovID_CARD"]').forEach((input) => {
    input.addEventListener("blur", () => formatIDCard(input));
  });
  document.querySelectorAll('input[id^="GovBirthday"]').forEach((input) => {
    input.addEventListener("blur", () => formatBirthday(input));
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  generateGovForms(); // เรียกครั้งแรกเมื่อหน้าเว็บถูกโหลด
});


