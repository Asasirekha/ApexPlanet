document.getElementById("contactForm").addEventListener("submit", function(event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      event.preventDefault();
      return;
    }
  
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
    }
  });
  