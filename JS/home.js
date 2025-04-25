// Function to handle responsive behavior
function handleResponsive() {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelector('.navbar-links');
    const menuIcon = document.querySelector('.menu-icon');
    const screenWidth = window.innerWidth;

    // Toggle navbar links for mobile view
    if (screenWidth <= 768) {
        menuIcon.style.display = 'block';
        menuIcon.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
        });
    } else {
        menuIcon.style.display = 'none';
        navbarLinks.classList.remove('active');
    }
}

// Initial call to handle responsiveness
handleResponsive();

// Add event listener for window resize
window.addEventListener('resize', handleResponsive);
