// =========================================================
// BANCO DE DADOS LOCAL E AUTENTICAÇÃO (DEMOCINFO)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Inicializa a base de usuários no localStorage se não existir
    if (!localStorage.getItem("democinfo_db_usuarios")) {
        const usuariosIniciais = [
            {
                empresa: "DemocInfo Corp",
                nome: "Administrador",
                email: "admin@democinfo.com",
                senha: "admin123",
                isAdmin: true,
                clientes: [
                    { nome: "João Silva", email: "joao@email.com", dias: 27, valor: "450,00" },
                    { nome: "Maria Santos", email: "maria@email.com", dias: 24, valor: "1.200,00" }
                ]
            }
        ];
        localStorage.setItem("democinfo_db_usuarios", JSON.stringify(usuariosIniciais));
    }

    // --- 1. PROCESSAR CADASTRO ---
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

            let usuarios = JSON.parse(localStorage.getItem("democinfo_db_usuarios"));

            // Verifica se o e-mail já está cadastrado
            const existe = usuarios.find(u => u.email === email);
            if (existe) {
                alert("Este e-mail já está cadastrado. Faça login.");
                window.location.href = "login.html";
                return;
            }

            // Cria novo usuário com base de clientes vazia
            const novoUsuario = {
                empresa,
                nome,
                email,
                senha,
                isAdmin: false,
                clientes: []
            };

            usuarios.push(novoUsuario);
            localStorage.setItem("democinfo_db_usuarios", JSON.stringify(usuarios));

            // Define a sessão ativa
            localStorage.setItem("democinfo_usuario_logado_email", email);
            localStorage.setItem("usuarioLogado", "true");

            alert("Conta criada com sucesso! Redirecionando...");
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

            let usuarios = JSON.parse(localStorage.getItem("democinfo_db_usuarios"));

            const usuarioEncontrado = usuarios.find(u => u.email === emailInput && u.senha === senhaInput);

            if (usuarioEncontrado) {
                localStorage.setItem("democinfo_usuario_logado_email", usuarioEncontrado.email);
                localStorage.setItem("usuarioLogado", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("E-mail ou senha incorretos.");
            }
        });
    }

    // --- 3. PROTEGER O DASHBOARD ---
    if (window.location.pathname.includes("dashboard.html")) {
        const logado = localStorage.getItem("usuarioLogado");
        const emailLogado = localStorage.getItem("democinfo_usuario_logado_email");
        if (logado !== "true" || !emailLogado) {
            alert("Você precisa fazer login para acessar o painel.");
            window.location.href = "login.html";
        }
    }
});