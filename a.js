// Auto Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Start the slider
showSlide(currentSlide);
setInterval(nextSlide, 3000);

// Order Processing Functionality
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const selectedOptions = Array.from(document.querySelectorAll('input[name="taste"]:checked')).map(option => option.value);
    const size = document.querySelector('input[name="size"]:checked');
    const delivery = document.querySelector('select[name="delivery"]').value;
    
    // Validate form
    if (!name || selectedOptions.length === 0 || !size) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate price based on size
    let price;
    switch(size.value) {
        case 'small':
            price = 12.99;
            break;
        case 'medium':
            price = 16.99;
            break;
        case 'large':
            price = 21.99;
            break;
    }
    
    // Add delivery fee for same-day delivery
    if (delivery === 'same-day') {
        price += 3.99;
    }
    
    // Format the selected options for display
    const formattedOptions = selectedOptions.map(option => {
        return option.charAt(0).toUpperCase() + option.slice(1);
    }).join(', ');
    
    // Create order summary
    const orderSummary = `
        <div class="order-summary">
            <h2>Order Complete!</h2>
            <p>Thank you, <strong>${name}</strong>!</p>
            <p>Your <strong>${size.value}</strong> chicken with:</p>
            <ul class="selected-options">
                ${selectedOptions.map(option => <li>${option.charAt(0).toUpperCase() + option.slice(1)}</li>).join('')}
            </ul>
            <div class="price-details">
                <p>Base Price: <strong>$${price.toFixed(2)}</strong></p>
                ${delivery === 'same-day' ? <p>Same-Day Delivery: <strong>$3.99</strong></p> : ''}
                <p class="total">Total: <strong>$${(delivery === 'same-day' ? price + 3.99 : price).toFixed(2)}</strong></p>
            </div>
            <p>Delivery: <strong>${delivery.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong></p>
            <button class="new-order-btn">Place Another Order</button>
        </div>
    `;
    
    // Replace form with order summary
    document.querySelector('.form-container').innerHTML = orderSummary;
    
    // Add event listener to the new order button
    document.querySelector('.new-order-btn').addEventListener('click', function() {
        location.reload();
    });
    
    // Scroll to the order summary
    document.querySelector('.order-summary').scrollIntoView({ behavior: 'smooth' });
});