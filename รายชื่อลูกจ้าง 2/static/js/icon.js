document.addEventListener('DOMContentLoaded', function () {
    // เช็คสถานะการล็อกอิน
    fetch('/check-login-status', {
        method: 'GET',
        credentials: 'same-origin' // ส่งเซสชันไปกับคำขอ
    })
        .then(response => response.json())
        .then(data => {
            const loginIcon = document.getElementById('login-icon');
            const iconPlaceholder = document.getElementById('icon-placeholder');

            if (data.loggedIn) {
                // ซ่อนไอคอนล็อกอินและแสดงไอคอนใหม่หากล็อกอินสำเร็จ
                loginIcon.style.display = 'none';
                iconPlaceholder.style.display = 'list-item'; // เปลี่ยนจาก 'none' เป็น 'list-item'
            } else {
                // แสดงไอคอนล็อกอินและซ่อนไอคอนใหม่หากยังไม่ได้ล็อกอิน
                loginIcon.style.display = 'list-item'; // เปลี่ยนจาก 'none' เป็น 'list-item'
                iconPlaceholder.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
});