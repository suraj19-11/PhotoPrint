document.addEventListener("DOMContentLoaded", function () {
    function generateOrderId() {
        return Math.floor(10000000 + Math.random() * 90000000); // Generates an 8-digit order ID
    }

    document.querySelector(".id").textContent = generateOrderId();
});

