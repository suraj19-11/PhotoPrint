document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (loggedInUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }

    // Redirect to login if not logged in and trying to access protected pages
    if (!loggedInUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('signup.html')) {
        window.location.href = 'login.html';
    }
});

// =======================
// ✅ Signup Logic
// =======================

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const res = await axios.post('http://localhost:8000/api/auth/register', {
                email,
                password
            });

            alert('Signup successful! Please log in.');
            window.location.href = 'login.html';

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Signup failed');
        }
    });
}

// =======================
// ✅ Login Logic
// =======================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password
            });

            const { user } = res.data;
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            alert('Login successful!');
            window.location.href = 'index2.html';

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Login failed');
        }
    });
}

// =======================
// ✅ Logout Logic
// =======================
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
}
