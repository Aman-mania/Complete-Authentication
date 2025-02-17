// Adjust BASE_URL to match your server URL
const BASE_URL = 'http://localhost:3000/api/user';

// ---------------------
// 1. Registration Logic
// ---------------------
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    const pass_cnf = document.getElementById('regPassCnf').value;
    const tc = document.getElementById('regTC').checked;
    const messageDiv = document.getElementById('regMessage');

    // POST /register
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, pass, pass_cnf, tc })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
      if (data.status === 'success') {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Optionally redirect to dashboard
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

// ---------------
// 2. Login Logic
// ---------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const messageDiv = document.getElementById('loginMessage');

    // POST /login
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
      if (data.status === 'success') {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

// -----------------------
// 3. Get Logged-In User
// -----------------------
const getUserBtn = document.getElementById('getUserBtn');
if (getUserBtn) {
  getUserBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const userInfoDiv = document.getElementById('userInfo');

    if (!token) {
      userInfoDiv.textContent = 'No token found. Please login.';
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/loggedUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.user) {
        userInfoDiv.textContent = `User: ${data.user.name} (Email: ${data.user.email})`;
      } else {
        userInfoDiv.textContent = data.message || 'Unable to get user.';
      }
    } catch (error) {
      userInfoDiv.textContent = 'Error: ' + error;
    }
  });
}

// --------------------
// 4. Change Password
// --------------------
const changePassForm = document.getElementById('changePassForm');
if (changePassForm) {
  changePassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pass = document.getElementById('newPass').value;
    const pass_cnf = document.getElementById('newPassCnf').value;
    const messageDiv = document.getElementById('changePassMessage');
    const token = localStorage.getItem('token');

    if (!token) {
      messageDiv.textContent = 'No token found. Please login.';
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/changePass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pass, pass_cnf })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

// -----------
// 5. Logout
// -----------
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}

// -----------------------
// 6. Forgot Password
// -----------------------
const forgotPassForm = document.getElementById('forgotPassForm');
if (forgotPassForm) {
  forgotPassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    const messageDiv = document.getElementById('forgotPassMessage');

    try {
      const res = await fetch(`${BASE_URL}/pass-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

// ------------------------
// 7. Reset Password
// ------------------------
const resetPassForm = document.getElementById('resetPassForm');
if (resetPassForm) {
  // Parse URL params (id & token)
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');
  const userToken = urlParams.get('token');

  resetPassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pass = document.getElementById('resetPass').value;
    const pass_cnf = document.getElementById('resetPassCnf').value;
    const messageDiv = document.getElementById('resetPassMessage');

    if (!userId || !userToken) {
      messageDiv.textContent = 'Invalid password reset link.';
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/reset-pass/${userId}/${userToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass, pass_cnf })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

/* --- Navigation Section Toggling ---
   This code listens for hash changes (from navbar links)
   and displays the appropriate section while hiding the others.
   It does not interfere with your backend logic.
*/
document.addEventListener('DOMContentLoaded', function() {
  function showSection() {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Determine which section to show based on the hash
    let hash = window.location.hash;
    if (hash === '#register') {
      document.getElementById('register-section').classList.remove('hidden');
    } else if (hash === '#login') {
      document.getElementById('login-section').classList.remove('hidden');
    } else {
      // Default to home section if hash is '#home' or empty/unknown
      document.getElementById('home-section').classList.remove('hidden');
    }
  }

  // Run when the hash changes
  window.addEventListener('hashchange', showSection);
  // Run once on initial page load
  showSection();
});
