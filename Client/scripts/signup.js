const signUpButton = document.getElementById('signUpButton');

signUpButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const name = document.getElementById('nameSignUp').value;
  const email = document.getElementById('emailSignUp').value;
  const password = document.getElementById('passwordSignUp').value;

  const emailValid = isEmailValid(email);
  const passValid = isValidPassword(password);

  if (emailValid && passValid) {
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "/Client/Pages/login.html";
      } else {
        const errorMessage = data?.error || "Unknown server error";
        alert("Signup failed: " + errorMessage);
      }
      
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong while signing up.");
    }
  }
});

function isValidPassword(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^\w\s]/.test(password);
  const hasSpace = /\s/.test(password);

  let message = "Password validation:\n";

  if (hasUpper && hasDigit && hasSymbol && !hasSpace) {
    return true;
  } else {
    if (!hasUpper) message += "- ❌ Must include at least one uppercase letter\n";
    if (!hasDigit) message += "- ❌ Must include at least one number\n";
    if (!hasSymbol) message += "- ❌ Must include at least one symbol\n";
    if (hasSpace) message += "- ❌ Must NOT contain spaces\n";

    alert(message);
    return false;
  }
}

function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address (e.g., example@domain.com).");
    return false;
  }

  return true;
}

