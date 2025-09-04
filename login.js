 function loginUser(event) {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "hthombare840@gmail.com" && password === "Arjun@3141") {
        window.location.href = "index.html";
      } else {
        alert("Invalid credentials! Redirecting to Register page.");
        window.location.href = "register.html";
      }

      return false;
    }