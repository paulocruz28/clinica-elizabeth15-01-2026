// Aguarda o site carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
        // Alterna a classe 'active' para abrir/fechar o menu
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));


    // --- 2. EFEITO DE SCROLL NO HEADER ---
    const header = document.querySelector(".header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    // --- 3. SIMULAÇÃO DE ENVIO DE FORMULÁRIO ---
    const form = document.getElementById("form-agendamento");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio real (pois não temos servidor aqui)
        
        const nome = document.getElementById("nome").value;
        
        // Simples alerta de sucesso
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada. Entraremos em contato em breve.`);
        
        // Limpa o formulário
        form.reset();
    });
});