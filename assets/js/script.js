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
