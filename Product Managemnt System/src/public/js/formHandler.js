document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const messageContainer = document.getElementById("message");

  const showMessage = (message, type = "error") => {
    messageContainer.textContent = message;
    messageContainer.style.color = type === "error" ? "red" : "green";
  };

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault(); 

      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        // console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("id", result.id);

        if (response.ok) {
          showMessage("Login successful! Redirecting...", "success");
          setTimeout(() => {
            if (result.role === "admin") {
              window.location.href = "/admin/dashboard";
            } else {
              window.location.href = "/user/dashboard";
            }
          }, 2000);
        } else {
          showMessage(result.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        showMessage("An error occurred. Please try again later.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          showMessage(
            "Registration successful! You can now log in.",
            "success"
          );
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000); 
        } else {
          showMessage(
            result.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error during registration:", error);
        showMessage("An error occurred. Please try again later.");
      }
    });
  }
});
