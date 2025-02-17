  /* ---------------------------------
     Contact Page Logic (Integrated)
  --------------------------------- */
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
  
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const message = document.getElementById('contactMessage').value;
        const statusDiv = document.getElementById('contactMessageStatus');
  
        // 1) Retrieve the token
        const token = localStorage.getItem('token');
        if (!token) {
          statusDiv.textContent = 'You must be logged in to submit a message.';
          return;
        }
  
        try {
          // 2) POST /api/user/contact with Bearer token
          const res = await fetch('http://localhost:3000/api/user/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, phone, message })
          });
  
          // 3) Parse server response
          const data = await res.json();
          statusDiv.textContent = data.message || 'Message submitted successfully.';
        } catch (err) {
          statusDiv.textContent = 'Error: ' + err;
        }
      });
    }
  });
  