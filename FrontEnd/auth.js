// =========================================================
// LÓGICA DE CADASTRO, LOGIN E SEGURANÇA
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
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

            // Cria o objeto do usuário
            const novoUsuario = { empresa, nome, email, senha };

            // Salva os dados do usuário no localStorage
            localStorage.setItem("democinfo_usuario", JSON.stringify(novoUsuario));
            
            // Marca a sessão como ativa
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

            // Busca os dados cadastrados salvos anteriormente
            const usuarioSalvoStr = localStorage.getItem("democinfo_usuario");

            if (!usuarioSalvoStr) {
                // Caso o usuário tente logar direto sem ter cadastrado nada antes, criamos uma conta padrão de teste
                const usuarioTeste = {
                    empresa: "Empresa Teste",
                    nome: "João Silva",
                    email: emailInput,
                    senha: senhaInput
                };
                localStorage.setItem("democinfo_usuario", JSON.stringify(usuarioTeste));
            }

            const usuarioSalvo = JSON.parse(localStorage.getItem("democinfo_usuario"));

            // Valida e-mail e senha
            if (emailInput === usuarioSalvo.email && senhaInput === usuarioSalvo.senha) {
                localStorage.setItem("usuarioLogado", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("E-mail ou senha incorretos. Tente novamente.");
            }
        });
    }

    // --- 3. PROTEGER O DASHBOARD (Bloquear acesso sem login) ---
    if (window.location.pathname.includes("dashboard.html")) {
        const logado = localStorage.getItem("usuarioLogado");
        if (logado !== "true") {
            alert("Você precisa fazer login para acessar o painel.");
            window.location.href = "login.html";
        }
    }
});