// $(document).ready(function () {
//     $(".faq-question").on("click", function () {
//         const answer = $(this).next(".faq-answer");
//         const icon = $(this).find(".toggle-icon");

//         // Toggle visibility of the answer
//         answer.slideToggle(300);

//         // Change the "+" to a "-" or vice versa
//         icon.text(icon.text() === "+" ? "-" : "+");
//     });
// });
// const slider = document.querySelector('.slider');
// const prevBtn = document.querySelector('.prev-btn');
// const nextBtn = document.querySelector('.next-btn');

// let scrollAmount = 0;

// nextBtn.addEventListener('click', () => {
//     scrollAmount -= 220; // Adjust based on card width + margin
//     slider.style.transform = `translateX(${scrollAmount}px)`;
// });

// prevBtn.addEventListener('click', () => {
//     scrollAmount += 220; // Adjust based on card width + margin
//     slider.style.transform = `translateX(${scrollAmount}px)`;
// });


const slider = document.querySelector('.slider'); // The slider element
const sliderContainer = document.querySelector('.cardscampaigns'); // The visible container
const prevBtn = document.querySelector('.prev-btn'); // Left button
const nextBtn = document.querySelector('.next-btn'); // Right button

let currentTranslate = 0; // Current position of the slider
let startX = 0; // Starting X position for swipe
let isSwiping = false; // Tracks if a swipe is in progress

// Function to slide left or right with boundary checks
function slide(direction) {
    const sliderWidth = slider.offsetWidth; // Total width of the slider
    const containerWidth = sliderContainer.offsetWidth; // Width of the visible container

    if (direction === 'left') {
        // Prevent sliding beyond the first card
        currentTranslate = Math.min(currentTranslate + 220, 0);
    } else if (direction === 'right') {
        // Prevent sliding beyond the last card
        currentTranslate = Math.max(currentTranslate - 220, containerWidth - sliderWidth);
    }

    // Apply the calculated translation
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Button click events
prevBtn.addEventListener('click', () => slide('left'));
nextBtn.addEventListener('click', () => slide('right'));

// Swipe detection for mobile devices
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Record the starting touch position
    isSwiping = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    // Temporarily move the slider during the swipe
    slider.style.transform = `translateX(${currentTranslate + deltaX}px)`;
});

slider.addEventListener('touchend', (e) => {
    isSwiping = false; // Swipe has ended
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // Detect swipe direction and trigger sliding
    if (deltaX > 50) {
        slide('left'); // Swipe right
    } else if (deltaX < -50) {
        slide('right'); // Swipe left
    }
});


// hamberger and counter
// Number Count Animation
function animateCounter(target, element, duration) {
    let start = 0;
    let increment = target / (duration / 16);
    let interval = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(interval);
        }
        element.textContent = Math.floor(start).toLocaleString() + "+";
    }, 16);
}

document.addEventListener("DOMContentLoaded", function () {
    let counterElement = document.getElementById("actualcounter");
    animateCounter(217924, counterElement, 3000); // 3 seconds animation
});

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("show");
}

// Open Menu on Click
//document.querySelector(".hamburger").addEventListener("click", toggleMenu);

//admin form function
function togglePassword() {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

//donation page
document.addEventListener("DOMContentLoaded", function () {
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    const paymentDetails = document.getElementById("payment-details");

    function updatePaymentFields() {
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
        let inputField = "";

        if (selectedPayment === "credit-card") {
            inputField = '<input type="text" id="card-number" name="card-number" placeholder="Card Number" required>';
        } else if (selectedPayment === "paypal") {
            inputField = '<input type="email" id="paypal-email" name="paypal-email" placeholder="PayPal Email" required>';
        } else if (selectedPayment === "mobile-money") {
            inputField = '<input type="text" id="mobile-number" name="mobile-number" placeholder="Mobile Money Number" required>';
        }

        paymentDetails.innerHTML = inputField;
    }

    paymentOptions.forEach(option => {
        option.addEventListener("change", updatePaymentFields);
    });

    document.getElementById("donationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = document.getElementById("donation-amount").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (!amount || amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        alert(`Thank you, ${name}! Your donation of $${amount} has been received.`);
        this.reset();
        updatePaymentFields();
    });

    updatePaymentFields();
});
