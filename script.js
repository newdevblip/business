document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const totalPriceElement = document.getElementById('total-price');

    productForm.addEventListener('click', function(event) {
        if (event.target.classList.contains('increment')) {
            changeQuantity(event.target, 1);
        } else if (event.target.classList.contains('decrement')) {
            changeQuantity(event.target, -1);
        }
    });

    productForm.addEventListener('input', function(event) {
        if (event.target.type === 'number') {
            removeLeadingZero(event.target);
            calculateTotalPrice();
        }
    });

    productForm.addEventListener('blur', function(event) {
        if (event.target.type === 'number') {
            if (event.target.value === '') {
                event.target.value = 0;
            }
            calculateTotalPrice();
        }
    }, true);

    function changeQuantity(button, change) {
        const input = button.parentElement.querySelector('input[type="number"]');
        let currentValue = parseInt(input.value);
        currentValue += change;
        if (currentValue < 0) {
            currentValue = 0;
        }
        input.value = currentValue;
        calculateTotalPrice();
    }

    function removeLeadingZero(input) {
        let value = input.value;
        if (value.length > 1 && value.charAt(0) === '0') {
            input.value = value.slice(1);
        }
    }

    function calculateTotalPrice() {
        let totalPrice = 0;
        document.querySelectorAll('.product input').forEach(function(input) {
            const quantity = parseInt(input.value);
            const price = parseFloat(input.getAttribute('data-price'));
            totalPrice += quantity * price;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});
