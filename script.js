// script.js
document.addEventListener('DOMContentLoaded', function () {
     // Khởi tạo đồng hồ đếm ngược
     const countdownDate = new Date('2024-12-31T00:00:00').getTime(); // Thay đổi ngày và giờ theo yêu cầu

     // Cập nhật đồng hồ đếm ngược mỗi giây
     const interval = setInterval(function() {
         const now = new Date().getTime();
         const distance = countdownDate - now;
 
         // Tính toán thời gian còn lại
         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
         // Hiển thị kết quả
         document.getElementById('days').innerText = days;
         document.getElementById('hours').innerText = hours;
         document.getElementById('minutes').innerText = minutes;
         document.getElementById('seconds').innerText = seconds;
 
         // Nếu đồng hồ đếm ngược kết thúc
         if (distance < 0) {
             clearInterval(interval);
             document.getElementById('timer').innerText = "Đếm ngược đã kết thúc!";
         }
     }, 1000);
     
     const registrationForm = document.getElementById('registration-form');
    
    // Thêm sự kiện khi người dùng gửi form
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn không cho form gửi dữ liệu mặc định

        // Lấy dữ liệu từ form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const school = document.getElementById('school').value;
        const event = document.getElementById('event').value;

        // Gửi dữ liệu đến Google Apps Script Web App
        fetch('https://script.google.com/macros/s/AKfycbwK4EKuXHu5_xBvqnruDwphdfjRSXy-qfCSqkIMARS8tthTKGCqASZnNsBBgfjymNHf/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Thay đổi loại dữ liệu
            },
            body: new URLSearchParams({
                name: name,
                email: email,
                phone: phone,
                birthdate: birthdate,
                school: school,
                event: event
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Đăng ký thành công!') {
                alert(data);
                registrationForm.reset(); // Làm mới form sau khi đăng ký
            } else {
                alert(data);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
