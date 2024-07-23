async function checkDuplicateIDCard(input) {
    let value = input.value.replace(/-/g, ''); // ลบเครื่องหมายขีดออกทั้งหมดก่อน
    if (value.length === 13) {
        // ตรวจสอบข้อมูลซ้ำในฐานข้อมูล
        try {
            let response = await fetch('/checkIDCard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idCard: value })
            });
            let result = await response.json();
            if (result.duplicate) {
                alert('เลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว');
                input.focus();
            } else {
                // จัดรูปแบบตัวเลขให้อยู่ในรูปแบบ 1-1111-11111-11-1
                input.value = `${value.slice(0, 1)}-${value.slice(1, 5)}-${value.slice(5, 10)}-${value.slice(10, 12)}-${value.slice(12)}`;
                alertShownIDCard = false; // รีเซ็ตสถานะการแจ้งเตือนเมื่อกรอกถูกต้อง
            }
        } catch (error) {
            console.error('Error checking ID card:', error);
        }
    } else if (!alertShownIDCard) {
        // แสดงข้อความแจ้งเตือนถ้าผู้ใช้กรอกเลขไม่ครบ 13 หลัก
        alert('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก');
        input.focus();
        alertShownIDCard = true; // ตั้งค่าสถานะการแจ้งเตือนให้เป็น true หลังแสดงแจ้งเตือน
    }
}

function formatIDCard(input) {
    let value = input.value.replace(/-/g, ''); // ลบเครื่องหมายขีดออกทั้งหมดก่อน
    if (value.length === 13) {
        // จัดรูปแบบตัวเลขให้อยู่ในรูปแบบ 1-1111-11111-11-1
        input.value = `${value.slice(0, 1)}-${value.slice(1, 5)}-${value.slice(5, 10)}-${value.slice(10, 12)}-${value.slice(12)}`;
        alertShownIDCard = false; // รีเซ็ตสถานะการแจ้งเตือนเมื่อกรอกถูกต้อง
    } else if (!alertShownIDCard) {
        // แสดงข้อความแจ้งเตือนถ้าผู้ใช้กรอกเลขไม่ครบ 13 หลัก
        alert('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก');
        input.focus();
        alertShownIDCard = true; // ตั้งค่าสถานะการแจ้งเตือนให้เป็น true หลังแสดงแจ้งเตือน
    }
}

function formatBirthday(input) {
    let value = input.value.replace(/\//g, ""); // ลบเครื่องหมาย / ทั้งหมดก่อน
    if (value.length === 8) {
      // จัดรูปแบบตัวเลขให้อยู่ในรูปแบบ 02/06/2545
      input.value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
      alertShownBirthday = false; // รีเซ็ตสถานะการแจ้งเตือนเมื่อกรอกถูกต้อง
    } else if (!alertShownBirthday) {
      // แสดงข้อความแจ้งเตือนถ้าผู้ใช้กรอกเลขไม่ครบ 8 หลัก
      alert("กรุณากรอกวันที่ให้ครบ 8 หลักในรูปแบบ 02/06/2545");
      input.focus();
      alertShownBirthday = true; // ตั้งค่าสถานะการแจ้งเตือนให้เป็น true หลังแสดงแจ้งเตือน
    }
  }

  function formatTel(input) {
    let value = input.value.replace(/-/g, ""); // Remove all dashes
    if (value.length === 10) {
      // Format the number as XXX-XXX-XXXX
      input.value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
      alertShownTel = false; // รีเซ็ตสถานะการแจ้งเตือนเมื่อกรอกถูกต้อง
    } else if (!alertShownTel) {
      // Optional: show an alert if the number is not 10 digits long
      alert("กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก");
      input.focus();
      alertShownTel = true; // ตั้งค่าสถานะการแจ้งเตือนให้เป็น true หลังแสดงแจ้งเตือน
    }
  }