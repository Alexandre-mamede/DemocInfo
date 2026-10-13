// =========================================================
// LÓGICA DE CADASTRO, LOGIN E GERENCIAMENTO DE USUÁRIOS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // --- GARANTIR CONTA ADMIN DE EXEMPLO NO SISTEMA ---
    if (!localStorage.getItem("democinfo_admin_criado")) {
        const contaAdmin = {
            empresa: "DemocInfo Corp",
            nome: "Administrador",
            email: "admin@democinfo.com",
            senha: "admin123",
            isAdmin: true
        };
        localStorage.setItem("democinfo_admin", JSON.stringify(contaAdmin));
        localStorage.setItem("democinfo_admin_criado", "true");
    }

    // --- 1. PROCESSAR CADASTRO (CONTA NOVA VAZIA) ---
    const cadastroForm = document.getElementById("cadastroForm");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const empresa = document.getElementById("empresa").value.trim();
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }

            // Cria o objeto do usuário comum (com dados vazios para o dashboard)
            const novoUsuario = {
                empresa,
                nome,
                email,
                senha,
                isAdmin: false,
                dadosDashboard: {
                    analisados: 0,
                    emRisco: 0,
                    recuperados: 0,
                    clientesRiscoLista: []
                }
            };

            // Salva como usuário logado atual e armazena na lista de cadastros
            localStorage.setItem("democinfo_usuario_logado", JSON.stringify(novoUsuario));
            localStorage.setItem("usuarioLogado", "true");

            alert("Conta criada com sucesso! Redirecionando para o painel...");
            window.location.href = "dashboard.html";
        });
    }

    // --- 2. PROCESSAR LOGIN ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("email").value.trim();
            const senhaInput = document.getElementById("senha").value.trim();

            const adminSalvo = JSON.parse(localStorage.getItem("democinfo_admin"));
            const usuarioCustomizado = JSON.parse(localStorage.getItem("democinfo_usuario_logado"));

            // Verifica se é o Admin de exemplo
            if (emailInput === adminSalvo.email && senhaInput === adminSalvo.senha) {
                localStorage.setItem("democinfo_usuario_logado", JSON.stringify(adminSalvo));
                localStorage.setItem("usuarioLogado", "true");
                window.location.href = "dashboard.html";
                return;
            }

            // Verifica se é um usuário cadastrado comum
            if (usuarioCustomizado && emailInput === usuarioCustomizado.email && senhaInput === usuarioCustomizado.senha) {
                localStorage.setItem("usuarioLogado", "true");
                window.location.href = "dashboard.html";
                return;
            }

            alert("E-mail ou senha incorretos. (Dica admin: admin@democinfo.com / admin123)");
        });
    }

    // --- 3. PROTEGER O DASHBOARD ---
    if (window.location.pathname.includes("dashboard.html")) {
        const logado = localStorage.getItem("usuarioLogado");
        if (logado !== "true") {
            alert("Você precisa fazer login para acessar o painel.");
            window.location.href = "login.html";
        }
    }
});