import { checkToken, redirect } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms[0];
  const usernameInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login-button");

  if (checkToken()) {
    redirect("/index.html");
  }

  form.onsubmit = async function (event) {
    event.preventDefault();
    await login(usernameInput.value, passwordInput.value, loginButton);
   
  };

  usernameInput.oninput = function (event) {
    console.log(event.target.value);
  };

  passwordInput.oninput = function (event) {
    console.log(event.target.value);
  };
});

async function login(email, password, loginButton) {
  try {
    loginButton.disabled = true;
    showSpinner();

    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);

      if (checkToken()) {
        setTimeout(() => { 
          redirect("/index.html");
        }, 100); 
      }
    } else {
      console.error("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    loginButton.disabled = false;
    hideSpinner();
  }
}

function showSpinner() {
  document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}


