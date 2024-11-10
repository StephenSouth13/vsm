document.addEventListener('DOMContentLoaded', function () {
    // Countdown Timer Initialization
    const countdownDate = new Date('2024-12-12T03:00:00').getTime(); // Event date and time

    // Update the countdown every second
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Calculate remaining time
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the respective HTML elements
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        // If the countdown is over
        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('timer').innerText = "Sự kiện đã diễn ra!"; // Customize message
        }
    }, 1000);

   // Carousel Functionality
const newsCarousel = document.querySelector('.news-carousel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

let currentIndex = 0; // Chỉ số hiện tại

function showItems(index) {
    const items = document.querySelectorAll('.news-item');
    const totalItems = items.length;

    // Tính toán vị trí của carousel
    const offset = -index * 100; // Di chuyển carousel sang trái
    newsCarousel.style.transform = `translateX(${offset}%)`;
}

leftArrow.addEventListener('click', () => {
    const items = document.querySelectorAll('.news-item');
    const totalItems = items.length;
    
    // Chuyển về chỉ số trước
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1; // Vòng lại nếu đang ở đầu
    }
    showItems(currentIndex);
});

rightArrow.addEventListener('click', () => {
    const items = document.querySelectorAll('.news-item');
    const totalItems = items.length;

    // Chuyển về chỉ số sau
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Vòng lại nếu đang ở cuối
    }
    showItems(currentIndex);
});


    // Optional: Automatic Carousel Scrolling
    setInterval(scrollRight, 5000); // Auto-scroll every 5 seconds

    // Handle form submission
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const school = document.getElementById('school').value;
        const event = document.getElementById('event').value;

        // Validate that all fields are filled
        if (!name || !email || !phone || !birthdate || !school || !event) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Vui lòng nhập địa chỉ email hợp lệ.");
            return;
        }

        // Create form data object
        const formData = {
            name,
            email,
            phone,
            birthdate,
            school,
            event
        };

        // Send form data to the server
        fetch('submit_registration.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Đăng ký thành công!");
            registrationForm.reset(); // Clear the form
        })
        .catch(error => {
            console.error('Lỗi khi đăng ký:', error);
            alert("Đăng ký thất bại. Vui lòng thử lại sau.");
        });
    });
});
