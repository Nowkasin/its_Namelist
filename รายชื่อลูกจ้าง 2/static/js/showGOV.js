document.addEventListener("DOMContentLoaded", function () {
    displayGovDetails()
  });

  function editGov() {
      const govData = JSON.parse(localStorage.getItem('govData'));
      if (govData) {
          document.getElementById("govoffice-details").innerHTML = `
              <form id="edit-form">
                  <div class="card-horizontal">
                      <div class="card-body">
                          <div class="row">
                              <div class="col-md-6">
                                  <h5 class="mt-3 mb-2 text-muted">รายละเอียด</h5>
                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="identity">เจ้าหน้าที่ลำดับที่:</label>
                                              <input type="text" class="form-control" id="identity" value="${govData.Identity}" readonly>
                                          </div>
                                          <div class="form-group">
                                              <label for="fullName">ชื่อ-สกุล:</label>
                                              <input type="text" class="form-control" id="fullName" value="${govData.FullName}">
                                          </div>
                                          <div class="form-group">
                                                <label for="idCard">เลขบัตรประชาชน:</label>
                                                <input type="text" class="form-control" id="idCard" value="${govData.IDCard}" onblur="formatIDCard(this)" required>
                                            </div>
                                          <div class="form-group">
                                              <label for="position">ตำแหน่งปัจจุบัน:</label>
                                              <input type="text" class="form-control" id="position" value="${govData.Position}">
                                          </div>
                                          <div class="form-group">
                                              <label for="positionNumber">ตำแหน่งเลขที่:</label>
                                              <input type="text" class="form-control" id="positionNumber" value="${govData.PositionNumber}">
                                          </div>
                                          <div class="form-group">
                                              <label for="level">ระดับ:</label>
                                              <input type="text" class="form-control" id="level" value="${govData.Level}">
                                          </div>
                                          <div class="form-group">
                                              <label for="agency">หน่วยงาน:</label>
                                              <input type="text" class="form-control" id="agency" value="${govData.Agency}">
                                          </div>
                                          <div class="form-group">
                                              <label for="salary">เงินเดือน:</label>
                                              <input type="text" class="form-control" id="salary" value="${govData.Salary}">
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="telephone">โทรศัพท์มือถือ:</label>
                                              <input type="text" class="form-control" id="telephone" value="${govData.Telephone}" onblur="formatTel(this)" required>
                                          </div>
                                          <div class="form-group">
                                              <label for="birthDate">วัน เดือน ปีเกิด:</label>
                                              <input type="text" class="form-control" id="birthDate" value="${govData.BirthDate}" onblur="formatBirthday(this)" required>
                                          </div>
                                          <div class="form-group">
                                              <label for="startDate">วันสั่งบรรจุ:</label>
                                              <input type="text" class="form-control" id="startDate" value="${govData.StartDate}" onblur="formatBirthday(this)" required>
                                          </div>
                                          <div class="form-group">
                                              <label for="retireDate">วันครบเกษียณ:</label>
                                              <input type="text" class="form-control" id="retireDate" value="${govData.RetireDate}" onblur="formatBirthday(this)" required>
                                          </div>
                                          <div class="form-group">
                                              <label for="study">การศึกษาสูงสุด:</label>
                                              <input type="text" class="form-control" id="study" value="${govData.Study}">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <h5 class="mt-3 mb-2 text-muted">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h5>
                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="dateBm">ต.ม.:</label>
                                              <input type="text" class="form-control" id="dateBm" value="${govData.DateBm}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateBc">ต.ช.:</label>
                                              <input type="text" class="form-control" id="dateBc" value="${govData.DateBc}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateTm">ท.ม.:</label>
                                              <input type="text" class="form-control" id="dateTm" value="${govData.DateTm}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateTc">ท.ช.:</label>
                                              <input type="text" class="form-control" id="dateTc" value="${govData.DateTc}">
                                          </div>
                                          <div class="form-group">
                                              <label for="datePm1">ป.ม.:</label>
                                              <input type="text" class="form-control" id="datePm1" value="${govData.DatePm1}">
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="datePc2">ป.ช.:</label>
                                              <input type="text" class="form-control" id="datePc2" value="${govData.DatePc2}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateMvm3">ม.ว.ม.:</label>
                                              <input type="text" class="form-control" id="dateMvm3" value="${govData.DateMvm3}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateIPJ">ร.จ.พ.:</label>
                                              <input type="text" class="form-control" id="dateIPJ" value="${govData.DateIPJ}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateTrain">ข้อมูลการอบรม:</label>
                                              <input type="text" class="form-control" id="dateTrain" value="${govData.DateTrain}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateVinai">ข้อมูลโทษทางวินัย:</label>
                                              <input type="text" class="form-control" id="dateVinai" value="${govData.DateVinai}">
                                          </div>
                                          <div class="form-group">
                                              <label for="dateMove">การย้าย หรือ ได้รับการแต่งตั้ง:</label>
                                              <input type="text" class="form-control" id="dateMove" value="${govData.DateMove}">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="text-center">
                              <button type="button" class="btn btn-success mx-2" onclick="saveGov()">บันทึก</button>
                              <button type="button" class="btn btn-secondary mx-2" onclick="cancelEdit()">ยกเลิก</button>
                          </div>
                      </div>
                  </div>
              </form>
          `;
      } else {
          alert('ไม่พบข้อมูลเจ้าหน้าที่ราชการ');
      }
  }
  
  function saveGov() {
      const govData = {
          Identity: document.getElementById('identity').value,
          FullName: document.getElementById('fullName').value,
          IDCard: document.getElementById('idCard').value,
          Position: document.getElementById('position').value,
          PositionNumber: document.getElementById('positionNumber').value,
          Level: document.getElementById('level').value,
          Agency: document.getElementById('agency').value,
          Salary: document.getElementById('salary').value,
          Telephone: document.getElementById('telephone').value,
          BirthDate: document.getElementById('birthDate').value,
          StartDate: document.getElementById('startDate').value,
          RetireDate: document.getElementById('retireDate').value,
          Study: document.getElementById('study').value,
          DateBm: document.getElementById('dateBm').value,
          DateBc: document.getElementById('dateBc').value,
          DateTm: document.getElementById('dateTm').value,
          DateTc: document.getElementById('dateTc').value,
          DatePm1: document.getElementById('datePm1').value,
          DatePc2: document.getElementById('datePc2').value,
          DateMvm3: document.getElementById('dateMvm3').value,
          DateIPJ: document.getElementById('dateIPJ').value,
          DateTrain: document.getElementById('dateTrain').value,
          DateVinai: document.getElementById('dateVinai').value,
          DateMove: document.getElementById('dateMove').value,
      };
  
      fetch('/บันทึกข้อมูลเจ้าหน้าที่', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(govData)
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              Swal.fire({
                  icon: 'success',
                  title: 'บันทึกข้อมูลสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500
              });
              localStorage.setItem('govData', JSON.stringify(govData));
              displayGovDetails();  // ต้องการให้แสดงข้อมูลของพนักงาน
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาด',
                  text: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
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
  
  function cancelEdit() {
      displayGovDetails();
  }
  
  function deleteGov() {
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
            const govData = JSON.parse(localStorage.getItem('govData'));
            if (govData) {
                fetch('/ลบข้อมูล', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ID: govData.Identity })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire(
                            'ลบข้อมูลสำเร็จ!',
                            'ข้อมูลของคุณถูกลบแล้ว.',
                            'success'
                        );
                        localStorage.removeItem('govData');
                        document.getElementById("govoffice-details").innerHTML = "<p>No data found.</p>";
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

function displayGovDetails() {
    const govData = JSON.parse(localStorage.getItem("govData"));
    const govDetailsContainer = document.getElementById("govoffice-details");

    if (govData) {
        const cardHTML = `
            <div class="card-horizontal">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mt-3 mb-2 text-muted">รายละเอียด</h5>
                            <div class="row">
                                <div class="col-md-9">
                                    <h5>${govData.FullName}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        govDetailsContainer.innerHTML = cardHTML;

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
                                    <p>เจ้าหน้าที่ลำดับที่:</p>
                                    <p>${govData.Identity}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>เลขบัตรประชาชน:</p>
                                    <p>${govData.IDCard}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ตำแหน่งปัจจุบัน:</p>
                                    <p>${govData.Position}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ตำแหน่งเลขที่:</p>
                                    <p>${govData.PositionNumber}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ระดับ:</p>
                                    <p>${govData.Level}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>หน่วยงาน:</p>
                                    <p>${govData.Agency}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>เงินเดือน:</p>
                                    <p>${govData.Salary}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>โทรศัพท์มือถือ:</p>
                                    <p>${govData.Telephone}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>วัน เดือน ปีเกิด:</p>
                                    <p>${govData.BirthDate}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>วันสั่งบรรจุ:</p>
                                    <p>${govData.StartDate}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>วันครบเกษียณ:</p>
                                    <p>${govData.RetireDate}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>การศึกษาสูงสุด:</p>
                                    <p>${govData.Study}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mt-3 mb-1 text-muted">รับเครื่องราชอิสริยาภรณ์ และเหรียญจักรพรรดิมาลา 28 ก.ค.</h5>
                            <div class="row" style="text-align: center;">
                                <div class="form-group col-md-3">
                                    <p>ต.ม.</p>
                                    <p>${govData.DateBm}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ต.ช.</p>
                                    <p>${govData.DateBc}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ท.ม.</p>
                                    <p>${govData.DateTm}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ท.ช.</p>
                                    <p>${govData.DateTc}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ป.ม.</p>
                                    <p>${govData.DatePm1}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ป.ช.</p>
                                    <p>${govData.DatePc2}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ม.ว.ม.</p>
                                    <p>${govData.DateMvm3}</p>
                                </div>
                                <div class="form-group col-md-3">
                                    <p>ร.จ.พ.</p>
                                    <p>${govData.DateIPJ}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mt-3 mb-2 text-muted">ข้อมูลเพิ่มเติม</h5>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <p>ข้อมูลการอบรม:</p>
                                    <p>${govData.DateTrain}</p>
                                </div>
                                <div class="form-group col-md-4">
                                    <p>ข้อมูลโทษทางวินัย:</p>
                                    <p>${govData.DateVinai}</p>
                                </div>
                                <div class="form-group col-md-4">
                                    <p>การย้าย หรือ ได้รับการแต่งตั้ง:</p>
                                    <p>${govData.DateMove}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary mx-2" onclick="editGov()">แก้ไข</button>
                        <button class="btn btn-danger mx-2" onclick="deleteGov()">ลบ</button>
                    </div>
                </div>
            </div>
        `;
        dropdownContent.innerHTML = detailedHTML;

        const detailsContainer = document.querySelector(".card-body");
        detailsContainer.appendChild(dropdownButton);
        detailsContainer.appendChild(dropdownContent);
    } else {
        govDetailsContainer.innerHTML = "<p>No data found.</p>";
    }
}
