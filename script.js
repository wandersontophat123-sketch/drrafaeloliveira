// ==========================================
// 1. CONFIGURAÇÕES DO SITE
// Altere os dados principais nesta seção.
// ==========================================

// WHATSAPP DO CONSULTÓRIO
// Informe DDD + número, somente com dígitos.
// Exemplo: 5598991234567
// Deixe vazio até confirmar o número correto.
const telefoneWhatsApp = "";

// MENSAGEM INICIAL DO WHATSAPP
const mensagemWhatsApp =
    "Olá! Gostaria de obter informações sobre consultas com o Dr. João Pedro Sampaio.";


// ==========================================
// 2. MENU MOBILE
// Abre e fecha o menu em celulares.
// ==========================================

const botaoMenu = document.querySelector(".menu-toggle");
const navegacao = document.querySelector(".navigation");

if (botaoMenu && navegacao) {
    // ABRIR OU FECHAR O MENU
    botaoMenu.addEventListener("click", () => {
        const menuAberto = botaoMenu.getAttribute("aria-expanded") === "true";

        botaoMenu.setAttribute("aria-expanded", String(!menuAberto));
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Abrir menu" : "Fechar menu"
        );

        navegacao.classList.toggle("is-open", !menuAberto);
    });

    // FECHAR O MENU DEPOIS DE CLICAR EM UM LINK
    const linksMenu = navegacao.querySelectorAll("a");

    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            navegacao.classList.remove("is-open");
        });
    });

    // FECHAR O MENU COM A TECLA ESC
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            navegacao.classList.remove("is-open");
        }
    });
}


// ==========================================
// 3. BOTÕES DO WHATSAPP
// Configura os links de contato.
// ==========================================

const botoesWhatsApp = document.querySelectorAll(".whatsapp-button");

botoesWhatsApp.forEach((botao) => {
    if (telefoneWhatsApp) {
        const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
        botao.href = `https://wa.me/${telefoneWhatsApp}?text=${mensagemCodificada}`;
        botao.target = "_blank";
        botao.rel = "noopener noreferrer";
    } else {
        // Evita abrir um link inválido antes da configuração do número.
        botao.addEventListener("click", (evento) => {
            evento.preventDefault();
            alert(
                "O WhatsApp ainda não foi configurado. " +
                "Adicione o número no arquivo js/script.js."
            );
        });
    }
});


// ==========================================
// 4. ANO AUTOMÁTICO NO RODAPÉ
// Atualiza o ano sem precisar editar o HTML.
// ==========================================

const elementoAno = document.querySelector("#current-year");

if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
}


// ==========================================
// 5. ANIMAÇÕES ACIONADAS PELA ROLAGEM
// Os elementos só começam a aparecer depois
// que o visitante começar a rolar a página.
// Funciona com mouse, teclado e toque no celular.
// Cada elemento anima apenas uma vez.
// ==========================================

const seletoresAnimacao = [
    ".value-card",
    ".about-image",
    ".about-content",
    ".section-heading",
    ".specialty-card",
    ".trajectory-content",
    ".gallery-item",
    ".contact-content",
    ".footer > *"
];

// Junta os elementos selecionados sem repetir nenhum.
const elementosAnimados = document.querySelectorAll(
    seletoresAnimacao.join(",")
);

// Detecta preferência do visitante por movimento reduzido.
const prefereMovimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefereMovimentoReduzido || !("IntersectionObserver" in window)) {
    // Acessibilidade e compatibilidade: mantém tudo visível.
    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("scroll-reveal", "is-visible");
    });
} else {
    let visitanteComecouARolar = false;

    // Prepara os elementos, mas não os anima no carregamento inicial.
    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("scroll-reveal");
    });

    const observadorRolagem = new IntersectionObserver(
        (entradas, observador) => {
            // Impede animações automáticas ao abrir ou recarregar a página.
            if (!visitanteComecouARolar) return;

            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observador.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    elementosAnimados.forEach((elemento) => {
        observadorRolagem.observe(elemento);
    });

    // A primeira rolagem pode vir do mouse, touch, teclado ou barra de rolagem.
    const liberarAnimacoes = () => {
        if (visitanteComecouARolar) return;

        visitanteComecouARolar = true;

        // Verifica imediatamente o que já estiver visível após a primeira rolagem.
        elementosAnimados.forEach((elemento) => {
            const posicao = elemento.getBoundingClientRect();
            const estaVisivel =
                posicao.bottom > 0 && posicao.top < window.innerHeight;

            if (estaVisivel) {
                elemento.classList.add("is-visible");
                observadorRolagem.unobserve(elemento);
            }
        });
    };

    window.addEventListener("scroll", liberarAnimacoes, { passive: true });
}


// ==========================================
// 6. OBSERVAÇÃO PARA FUTURAS FUNCIONALIDADES
// Mantenha cada funcionalidade em seu próprio
// bloco para facilitar a manutenção do projeto.
// ==========================================