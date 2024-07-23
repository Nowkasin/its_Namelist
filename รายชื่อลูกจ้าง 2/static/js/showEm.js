document.addEventListener("DOMContentLoaded", function () {
  displayEmployeeDetails()
});

function editEmployee() {
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  if (employeeData) {
    document.getElementById("employee-details").innerHTML = `
        <form id="edit-form">
          <div class="card-horizontal">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <h5 class="mt-3 mb-1 text-muted">รายละเอียด</h5>
                  <div class="row" style="text-align: center;">
                    <div class="form-group col-md-3">
                      <label>ลูกจ้างลำดับที่:</label>
                      <input type="text" id="Iden" value="${employeeData.Iden}" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                      <label>เลขบัตรประชาชน:</label>
                      <input type="text" id="IDCard" value="${employeeData.IDCard}" class="form-control" onblur="formatIDCard(this)" required>
                    </div>
                    <div class="form-group col-md-3">
                      <label>ตำแหน่ง:</label>
                      <input type="text" id="Position" value="${employeeData.Position}" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                      <label>ตำแหน่งเลขที่:</label>
                      <input type="text" id="PositionNumber" value="${employeeData.PositionNumber}" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                      <label>วัน เดือน ปีเกิด:</label>
                      <input type="text" id="BirthDate" value="${employeeData.BirthDate}" class="form-control" onblur="formatBirthday(this)" require>
                    </div>
                    <div class="form-group col-md-3">
                      <label>รับราชการ:</label>
                      <input type="text" id="StartDate" value="${employeeData.StartDate}" class="form-control" onblur="formatBirthday(this)" require>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h5 class="mt-3 mb-1 text-muted">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h5>
                  <div class="row" style="text-align: center;">
                    <div class="form-group col-md-2">
                      <label>บ.ม.</label>
                      <input type="text" id="DateBm" value="${employeeData.DateBm}" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                      <label>บ.ช.</label>
                      <input type="text" id="DateBc" value="${employeeData.DateBc}" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                      <label>จ.ม.</label>
                      <input type="text" id="DateJm" value="${employeeData.DateJm}" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                      <label>จ.ช.</label>
                      <input type="text" id="DateJc" value="${employeeData.DateJc}" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                      <label>ประเภท 4 ครบ 20 ปี</label>
                      <input type="text" id="Date20Years" value="${employeeData.Date20Years}" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                      <label>เกษียณ:</label>
                      <input type="text" id="RetireDate" value="${employeeData.RetireDate}" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button class="btn btn-primary mx-2" type="button" onclick="saveEmployee()">บันทึก</button>
                <button class="btn btn-secondary mx-2" type="button" onclick="cancelEdit()">ยกเลิก</button>
              </div>
            </div>
          </div>
        </form>
      `;
  } else {
    alert("ไม่พบข้อมูลเจ้าหน้าที่ราชการ");
  }
}

function saveEmployee() {
  const employeeData = {
    Iden: document.getElementById("Iden").value,
    IDCard: document.getElementById("IDCard").value,
    Position: document.getElementById("Position").value,
    PositionNumber: document.getElementById("PositionNumber").value,
    BirthDate: document.getElementById("BirthDate").value,
    StartDate: document.getElementById("StartDate").value,
    DateBm: document.getElementById("DateBm").value,
    DateBc: document.getElementById("DateBc").value,
    DateJm: document.getElementById("DateJm").value,
    DateJc: document.getElementById("DateJc").value,
    Date20Years: document.getElementById("Date20Years").value,
    RetireDate: document.getElementById("RetireDate").value,
  };

  fetch("/บันทึกข้อมูลลูกจ้าง", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("employeeData", JSON.stringify(employeeData));
        displayEmployeeDetails(); // ต้องการให้แสดงข้อมูลของพนักงาน
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "โปรดลองอีกครั้งในภายหลัง",
      });
    });
}

function cancelEdit() {
  displayEmployeeDetails();
}

function deleteEmployee() {
  Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!'
  }).then((result) => {
      if (result.isConfirmed) {
          const employeeData = JSON.parse(localStorage.getItem('employeeData'));
          if (employeeData) {
              fetch(' /ลบข้อมูลพนักงาน', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ ID: employeeData.Iden })
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      Swal.fire(
                          'ลบข้อมูลสำเร็จ!',
                          'ข้อมูลของคุณถูกลบแล้ว.',
                          'success'
                      );
                      localStorage.removeItem('employeeData');
                      document.getElementById("employee-details").innerHTML = "<p>No data found.</p>";
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'เกิดข้อผิดพลาด',
                          text: 'เกิดข้อผิดพลาดในการลบข้อมูล'
                      });
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  Swal.fire({
                      icon: 'error',
                      title: 'เกิดข้อผิดพลาด',
                      text: 'โปรดลองอีกครั้งในภายหลัง'
                  });
              });
          }
      }
  });
}

function displayEmployeeDetails() {
  const employeeData = JSON.parse(localStorage.getItem("employeeData"));
  const employeeDetailsContainer = document.getElementById("employee-details");

  if (employeeData) {
    const cardHTML = `
        <div class="card-horizontal">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5 class="mt-3 mb-2 text-muted">รายละเอียด</h5>
                <div class="row">
                  <div class="col-md-6">
                    <h5>${employeeData.FullName}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    employeeDetailsContainer.innerHTML = cardHTML;

    // Add dropdown functionality
    const dropdownButton = document.createElement("button");
    dropdownButton.className = "btn btn-info dropdown-toggle";
    dropdownButton.type = "button";
    dropdownButton.setAttribute("data-toggle", "collapse");
    dropdownButton.setAttribute("data-target", "#collapseDetails");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.setAttribute("aria-controls", "collapseDetails");
    dropdownButton.textContent = "ดูรายละเอียดเพิ่มเติม";

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "collapse";
    dropdownContent.id = "collapseDetails";

    const detailedHTML = `
        <div class="card-horizontal">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h5 class="mt-3 mb-1 text-muted">รายละเอียด</h5>
                <div class="row" style="text-align: center;">
                  <div class="form-group col-md-3">
                    <p>ลูกจ้างลำดับที่:</p>
                    <p>${employeeData.Iden}</p>
                  </div>
                  <div class="form-group col-md-3">
                    <p>เลขบัตรประชาชน:</p>
                    <p>${employeeData.IDCard}</p>
                  </div>
                  <div class="form-group col-md-3">
                    <p>ตำแหน่ง:</p>
                    <p>${employeeData.Position}</p>
                  </div>
                  <div class="form-group col-md-3">
                    <p>ตำแหน่งเลขที่:</p>
                    <p>${employeeData.PositionNumber}</p>
                  </div>
                  <div class="form-group col-md-3">
                    <p>วัน เดือน ปีเกิด:</p>
                    <p>${employeeData.BirthDate}</p>
                  </div>
                  <div class="form-group col-md-3">
                    <p>รับราชการ:</p>
                    <p>${employeeData.StartDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h5 class="mt-3 mb-1 text-muted">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h5>
                <div class="row" style="text-align: center;">
                  <div class="form-group col-md-2">
                    <p>บ.ม.</p>
                    <p>${employeeData.DateBm}</p>
                  </div>
                  <div class="form-group col-md-2">
                    <p>บ.ช.</p>
                    <p>${employeeData.DateBc}</p>
                  </div>
                  <div class="form-group col-md-2">
                    <p>จ.ม.</p>
                    <p>${employeeData.DateJm}</p>
                  </div>
                  <div class="form-group col-md-2">
                    <p>จ.ช.</p>
                    <p>${employeeData.DateJc}</p>
                  </div>
                  <div class="form-group col-md-2">
                    <p>ประเภท 4 ครบ 20 ปี</p>
                    <p>${employeeData.Date20Years}</p>
                  </div>
                  <div class="form-group col-md-2">
                    <p>เกษียณ:</p>
                    <p>${employeeData.RetireDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-primary mx-2" onclick="editEmployee()">แก้ไข</button>
              <button class="btn btn-danger mx-2" onclick="deleteEmployee()">ลบ</button>
            </div>
          </div>
        </div>
      `;
    dropdownContent.innerHTML = detailedHTML;

    const detailsContainer = document.querySelector(".card-body");
    detailsContainer.appendChild(dropdownButton);
    detailsContainer.appendChild(dropdownContent);
  } else {
    employeeDetailsContainer.innerHTML = "<p>No data found.</p>";
  }
}
