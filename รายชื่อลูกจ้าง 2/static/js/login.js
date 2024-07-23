document.addEventListener("DOMContentLoaded", function () {
  // Cache the DOM elements for better performance
  const container = document.getElementById("container");
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
 
  // Toggle panels on button clicks
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  // Form submission handler for Sign Up
  document
    .getElementById("signUpForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const isValid = validateSignUpForm();
      if (isValid) {
        const formData = new FormData(this);
        fetch(this.action, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              localStorage.setItem("isLoggedIn", "true"); // Set login status in localStorage
              window.location.href = "/"; // Redirect on success
            } else {
              return response.text();
            }
          })
          .then((text) => {
            if (text) {
              const errorDiv = document.getElementById("server-error");
              errorDiv.textContent = text; // Display server error message
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });

  // Form submission handler for Sign In
  document
    .getElementById("signInForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const isValid = validateSignInForm();
      if (isValid) {
        const formData = new FormData(this);
        fetch(this.action, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              localStorage.setItem("isLoggedIn", "true"); // Set login status in localStorage
              window.location.href = "/"; // Redirect on success
            } else {
              return response.text();
            }
          })
          .then((text) => {
            if (text) {
              const errorDiv = document.getElementById("server-error-signin");
              errorDiv.textContent = text; // Display server error message
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert("Please fill out all required fields.");
      }
    });

  // Validate the Sign Up form
  function validateSignUpForm() {
    const name = document.querySelector('input[name="nameuser"]').value.trim();
    const email = document.querySelector('input[name="Email"]').value.trim();
    const password = document.querySelector('input[name="pass"]').value.trim();
    const position = document.querySelector('select[name="position"]').value;

    const prefixErrorDiv = document.getElementById("prefix-error");
    const emailErrorDiv = document.getElementById("email-error");
    const passwordErrorDiv = document.getElementById("password-error");

    let isValid = true;

    const validPrefixes = ["นาย", "นาง", "นางสาว"];
    const prefix = name.split(" ")[0]; // Assuming the first word is the prefix
    if (!validPrefixes.includes(prefix)) {
      prefixErrorDiv.textContent = "กรุณากรอกคำนำหน้าชื่อ (นาย, นาง, นางสาว).";
      isValid = false;
    } else {
      prefixErrorDiv.textContent = "";
    }

    if (email.includes("@outlook.com") || email.includes("@hotmail.com")) {
      emailErrorDiv.textContent =
        "ไม่สามารถใช้ @outlook.com และ @hotmail.com ในการลงทะเบียนได้.";
      isValid = false;
    } else {
      emailErrorDiv.textContent = "";
    }

    const passwordPattern = /(?=.*[!@#$%^&*])/; // Require at least one special character
    if (
      password === "12345" ||
      password.length < 6 ||
      !passwordPattern.test(password)
    ) {
      if (password === "12345") {
        passwordErrorDiv.textContent = 'ห้ามใช้ "12345" เป็นรหัสผ่าน';
      } else if (password.length < 6) {
        passwordErrorDiv.textContent = "กรุณากรอกรหัสมากกว่า 6 ตัวขึ้นไป.";
      } else if (!passwordPattern.test(password)) {
        passwordErrorDiv.textContent = "กรุณากรอกตัวอักษรพิเศษไปด้วย.";
      }
      isValid = false;
    } else {
      passwordErrorDiv.textContent = "";
    }

    return isValid && name && email && password && position;
  }

  // Validate the Sign In form
  function validateSignInForm() {
    const nameuser = document
      .querySelector('#signInForm input[name="nameuser"]')
      .value.trim();
    const password = document
      .querySelector('#signInForm input[name="pass"]')
      .value.trim();

    const prefixErrorDiv = document.getElementById("prefix-error-signin");
    const passwordErrorDiv = document.getElementById("password-error-signin");

    let isValid = true;

    const validPrefixes = ["นาย", "นาง", "นางสาว"];
    const prefix = nameuser.split(" ")[0]; // Assuming the first word is the prefix
    if (!validPrefixes.includes(prefix)) {
      prefixErrorDiv.textContent = "กรุณากรอกคำนำหน้าชื่อ (นาย, นาง, นางสาว).";
      isValid = false;
    } else {
      prefixErrorDiv.textContent = "";
    }

    if (!password) {
      passwordErrorDiv.textContent = "กรุณากรอกรหัสผ่าน.";
      isValid = false;
    } else {
      passwordErrorDiv.textContent = "";
    }

    return isValid && nameuser && password;
  }

  // Live validation for email field
  document.getElementById("email").addEventListener("input", function () {
    const email = this.value;
    const errorDiv = document.getElementById("email-error");

    if (email.includes("@outlook.com") || email.includes("@hotmail.com")) {
      errorDiv.textContent =
        "ไม่สามารถลงทะเบียนโดยใช้ @outlook.com และ @hotmail.com .";
      this.setCustomValidity("Invalid email address.");
    } else {
      errorDiv.textContent = "";
      this.setCustomValidity("");
    }
  });

  // Live validation for password field
  document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const errorDiv = document.getElementById("password-error");

    const passwordPattern = /(?=.*[!@#$%^&*])/; // Require at least one special character
    if (
      password === "12345" ||
      password.length < 6 ||
      !passwordPattern.test(password)
    ) {
      if (password === "12345") {
        errorDiv.textContent = 'ไม่สามารถใช้ "12345" เป็นรหัสผ่านได้';
      } else if (password.length < 6) {
        errorDiv.textContent = "รหัสผ่านต้องมากกว่า 6 ตัว.";
      } else if (!passwordPattern.test(password)) {
        errorDiv.textContent = "ต้องมีตัวอักษรพิเศษ.";
      }
      this.setCustomValidity("Invalid password.");
    } else {
      errorDiv.textContent = "";
      this.setCustomValidity("");
    }
  });

});
