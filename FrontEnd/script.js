// =========================================================
// NAVBAR AO ROLAR A PÁGINA
// =========================================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// =========================================================
// ANIMAÇÃO DAS SEÇÕES
// =========================================================

const animatedElements = document.querySelectorAll(
    ".problem-card, .step, .feature-card, .pricing-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});


// =========================================================
// SCROLL SUAVE DOS LINKS
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});         
// =========================================================
// DIRECIONAMENTO INTELIGENTE DOS BOTÕES DE COMEÇAR (PLANOS)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os botões que iniciam a jornada (nos planos ou hero)
    const actionButtons = document.querySelectorAll('.pricing-card .btn, .hero-buttons .btn-primary, .nav-actions .btn-primary');

    actionButtons.forEach((button) => {
        // Verifica se o botão é de "Começar" ou "Falar conosco" (opcionalmente ajustando links de planos)
        const href = button.getAttribute("href");
        
        if (href && (href.includes("#planos") || href.includes("cadastro.html"))) {
            button.addEventListener("click", (event) => {
                event.preventDefault();

                // Verifica no navegador se existe um usuário logado 
                // (Você pode salvar algo como `localStorage.setItem('usuarioLogado', 'true')` na sua tela de login)
                const usuarioLogado = localStorage.getItem("usuarioLogado");

                if (usuarioLogado === "true") {
                    // Se já estiver logado, redireciona para a tela de dashboard/painel
                    window.location.href = "dashboard.html"; // Crie essa página ou aponte para a interna desejada
                } else {
                    // Se não estiver logado, redireciona para a tela de login/cadastro
                    window.location.href = "login.html";
                }
            });
        }
    });
});