```javascript
const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Preencha todos os campos.");
            return;
        }

        alert("Login realizado com sucesso.");

        window.location.href = "index.html";
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const company = document.getElementById("company").value.trim();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("passwordConfirm").value;

        if (!company || !name || !email || !password || !passwordConfirm) {
            alert("Preencha todos os campos.");
            return;
        }

        if (password.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("As senhas não coincidem.");
            return;
        }

        const user = {
            company,
            name,
            email
        };

        localStorage.setItem(
            "democinfo_user",
            JSON.stringify(user)
        );

        alert("Conta criada com sucesso.");

        window.location.href = "login.html";
    });
}
```
