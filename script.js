// Aguarda o site carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

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


    // --- 3. ENVIO REAL PARA O NODE.JS ---
    const form = document.getElementById("form-agendamento");

    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Pega os dados digitados
            const dados = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                queixa: document.getElementById("queixa").value,
                telefone: document.getElementById("telefone").value,
                mensagem: document.getElementById("mensagem").value
            };
        
            // Tenta enviar para o servidor
            // ATENÇÃO: Se você não tiver o servidor Node.js rodando, vai cair no erro (catch)
            fetch('/api/agendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensagem || "Envio realizado!"); 
                form.reset();
            })
            .catch(error => {
                console.error('Erro:', error);
                // Mensagem amigável caso o servidor não exista ainda
                alert("Erro ao conectar com o servidor. (Como é um teste, considere o envio simulado!)");
            });
        });
    }


    // --- 4. CALCULADORA IMC ---
    const btnCalcular = document.getElementById("btn-calcular");
    
    if(btnCalcular) { 
        btnCalcular.addEventListener("click", () => {
            const peso = parseFloat(document.getElementById("peso").value);
            const altura = parseFloat(document.getElementById("altura").value);
            const resultado = document.getElementById("resultado-imc");
            
            if (peso && altura) {
                const imc = peso / (altura * altura);
                let classificacao = "";
                let cor = "";

                if (imc < 18.5) {
                    classificacao = "Abaixo do peso.";
                    cor = "#e67e22"; 
                } else if (imc < 24.9) {
                    classificacao = "Peso saudável. Parabéns! (ODS 3)";
                    cor = "#27ae60"; 
                } else {
                    classificacao = "Sobrepeso. Cuide da sua saúde cardiovascular.";
                    cor = "#c0392b"; 
                }

                resultado.style.color = cor;
                resultado.innerHTML = `IMC: ${imc.toFixed(2)} - ${classificacao}`;
            } else {
                resultado.innerHTML = "Por favor, preencha todos os campos.";
                resultado.style.color = "red";
            }
        });
    }


    // --- 5. LOGICA DO MODAL DE PROCEDIMENTOS ---
    const modal = document.getElementById("modal-procedimento");
    const modalImg = document.getElementById("modal-img");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close-btn");
    const procItems = document.querySelectorAll(".proc-item");

    if(modal) { // Verifica se o modal existe na página para evitar erros
        // Função para abrir o modal
        procItems.forEach(item => {
            item.addEventListener("click", () => {
                const titulo = item.getAttribute("data-titulo");
                const img = item.getAttribute("data-img");
                const desc = item.getAttribute("data-desc");

                modalTitulo.textContent = titulo;
                modalImg.src = img;
                modalDesc.textContent = desc;

                modal.classList.add("active");
            });
        });

        // Função para fechar o modal
        function fecharModal() {
            modal.classList.remove("active");
        }

        // Fecha ao clicar no X
        if(closeBtn) {
            closeBtn.addEventListener("click", fecharModal);
        }

        // Fecha ao clicar fora da caixa branca
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
        
        // Torna global para o botão "Quero Agendar Este"
        window.fecharModal = fecharModal;
    }
    
});