const BASE_URL = `${window.location.origin}/api/user`;

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

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, pass, pass_cnf, tc })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}

/* ---------------------
   2. Login Logic
--------------------- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const messageDiv = document.getElementById('loginMessage');

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass })
      });
      const data = await res.json();
      messageDiv.textContent = data.message || '';
      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      messageDiv.textContent = 'Error: ' + error;
    }
  });
}
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

/* -----------
   5. Logout Logic
----------- */
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}
  //  Navigation Toggling for Index Page
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.section')) {
    function showSection() {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => section.classList.add('hidden'));
      let hash = window.location.hash;
      if (hash === '#register') {
        document.getElementById('register-section').classList.remove('hidden');
      } else if (hash === '#login') {
        document.getElementById('login-section').classList.remove('hidden');
      } else {
        document.getElementById('home-section').classList.remove('hidden');
      }
    }
    window.addEventListener('hashchange', showSection);
    showSection();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const userInfoDiv = document.getElementById("userInfo");
  if (userInfoDiv) {
    const token = localStorage.getItem("token");
    if (!token) {
      userInfoDiv.textContent = "No token found. Please login.";
      return;
    }
    fetch(`${BASE_URL}/loggedUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          userInfoDiv.innerHTML = `
            <h2>User Information</h2>
            <ul class="user-info-list">
              <li><strong>Name:</strong> ${data.user.name}</li>
              <li><strong>Email:</strong> ${data.user.email}</li>
            </ul>
          `;
        } else {
          userInfoDiv.textContent = data.message || "Unable to get user info.";
        }
      })
      .catch(err => {
        userInfoDiv.textContent = "Error: " + err;
      });

    const toggleBtn = document.getElementById("toggleChangePassBtn");
    const changePassSection = document.getElementById("change-password-section");
    if (toggleBtn && changePassSection) {
      toggleBtn.addEventListener("click", function() {
        changePassSection.classList.toggle("hidden");
      });
    }
  }
const contactMessagesList = document.getElementById("contactMessagesList");
if (contactMessagesList) {
  const token = localStorage.getItem("token");  // Retrieve JWT token
  fetch("http://localhost:3000/api/user/contacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}` // Add Bearer token here
    }
  })
    .then(res => res.json())
    .then(data => {
      // The controller sends back { status: 'success', contacts: [...] }
      if (data.contacts && data.contacts.length > 0) {
        let html = "";
        data.contacts.forEach(msg => {
          html += `<li>
            <strong>Name:</strong> ${msg.name} <br>
            <strong>Email:</strong> ${msg.email} <br>
            <strong>Phone:</strong> ${msg.phone} <br>
            <strong>Message:</strong> ${msg.message}
          </li>`;
        });
        contactMessagesList.innerHTML = html;
      } else {
        contactMessagesList.innerHTML = "<li>No contact messages found.</li>";
      }
    })
    .catch(err => {
      contactMessagesList.innerHTML = `<li>Error fetching messages: ${err}</li>`;
    });
}
});
