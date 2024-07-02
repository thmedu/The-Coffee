document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos relevantes do DOM para o carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let slideIndex = 0;
    const slideWidth = carouselSlides[0].offsetWidth + 16; // Largura do slide + margem

    // Define a largura do container baseado nos slides
    carouselContainer.style.width = `${slideWidth * carouselSlides.length}px`;

    // Função para navegar para o próximo slide
    function nextSlide() {
        slideIndex++;
        if (slideIndex >= carouselSlides.length) {
            slideIndex = 0;
        }
        scrollToSlide();
    }

    // Função para navegar para o slide anterior
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = carouselSlides.length - 1;
        }
        scrollToSlide();
    }

    // Função para rolar até o slide atual
    function scrollToSlide() {
        const scrollX = slideIndex * slideWidth;
        carouselContainer.scrollTo({
            left: scrollX,
            behavior: 'smooth'
        });
    }

    // Adiciona eventos aos botões de navegação
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Seleção de elementos relevantes do DOM para o carrinho de compras
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalDisplay = document.querySelector('.cart-total');
    let cartTotal = 0;

    // Adiciona eventos aos botões "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const price = parseFloat(button.getAttribute('data-price'));
            cartTotal += price;
            cartTotalDisplay.textContent = `Total no Carrinho: R$ ${cartTotal.toFixed(2)}`;
        });
    });
});

// Função para carregar scripts JavaScript de forma assíncrona
function loadScriptAsync(url) {
    let script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}

// Deferir o carregamento de scripts não críticos para depois que a página estiver carregada
document.addEventListener('DOMContentLoaded', function() {
    // Carregar script.js de forma assíncrona
    loadScriptAsync('./assets/js/script.js');
    loadScriptAsync('./assets/js/carrinho.js');
});

// Implementar caching de scripts
// Idealmente, configure caching no servidor para arquivos estáticos como JavaScript
// Exemplo de configuração de cache no servidor nginx:
// location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
//     expires 30d;
//     add_header Cache-Control "public";
// }

