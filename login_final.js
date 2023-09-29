const authenticate = async () => {
    const username = document.getElementById("user-name").value;
    const password = document.getElementById("user-pass").value;
    console.log(username, password);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Authentication is successful, redirect to home.html
        window.location.href = "chat.html";
      } else {
        // Handle authentication failure (e.g., display an error message)
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const showRegisterForm = () => {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
  };
  
  const showLoginForm = () => {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("register-box").style.display = "none";
  };
  
  const registerUser = async () => {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    console.log(username, email, password);
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Registration is successful, redirect to home.html
        window.location.href = "chat.html";
      } else {
        // Handle registration failure (e.g., display an error message)
        console.log("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
