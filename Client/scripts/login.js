const signInButton = document.getElementById('signInButton');

signInButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Ensure we store an actual object
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("session", JSON.stringify(data.session));
      alert("Login successful!");
      window.location.href = "/Client/Pages/Homepage.html";
    } else {
      alert("Login failed: " + data.error);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong while logging in.");
  }
});
