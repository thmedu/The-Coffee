// Classe para representar o Carrinho de Compras
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.closeCartBtn = document.querySelector('.close-cart');
        this.cartItems = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.cart-total');
        this.clearCartBtn = document.querySelector('.clear-cart');
        this.checkoutBtn = document.querySelector('.checkout');
        this.cartCounter = document.querySelector('.cart-counter');
        this.menuItems = document.querySelectorAll('.add-to-cart');

        this.cartIcon.addEventListener('click', () => this.toggleCart());
        this.closeCartBtn.addEventListener('click', () => this.closeCart());
        this.clearCartBtn.addEventListener('click', () => this.clearCart());
        this.cartItems.addEventListener('click', e => this.removeCartItem(e));

        this.menuItems.forEach(item => {
            item.addEventListener('click', () => this.addToCart(item));
        });

        this.updateCartCounter();
        this.renderCart();
    }

    // Método para adicionar item ao carrinho
    addToCart(itemElement) {
        const itemName = itemElement.dataset.name;
        const itemPrice = parseFloat(itemElement.dataset.price);

        const existingItem = this.cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        this.updateCartCounter();
        this.renderCart();
    }

    // Método para remover item do carrinho
    removeCartItem(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemName = e.target.dataset.name;
            const itemIndex = this.cart.findIndex(item => item.name === itemName);

            if (itemIndex !== -1) {
                if (this.cart[itemIndex].quantity > 1) {
                    this.cart[itemIndex].quantity--;
                } else {
                    this.cart.splice(itemIndex, 1);
                }

                this.updateCartCounter();
                this.renderCart();
            }
        }
    }

    // Método para limpar o carrinho
    clearCart() {
        this.cart = [];
        this.updateCartCounter();
        this.renderCart();
    }

    // Método para atualizar o contador de itens no ícone do carrinho
    updateCartCounter() {
        const totalItems = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        this.cartCounter.textContent = totalItems;
    }

    // Método para renderizar o carrinho no sidebar
    renderCart() {
        this.cartItems.innerHTML = '';

        this.cart.forEach(item => {
            const cartItemElement = this.createCartItemElement(item);
            this.cartItems.appendChild(cartItemElement);
        });

        const totalPrice = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        this.cartTotal.innerHTML = `Total: <span class="total-amount">R$ ${totalPrice.toFixed(2)}</span>`;

        this.checkoutBtn.style.display = this.cart.length > 0 ? 'inline-block' : 'none';
    }

    // Método auxiliar para criar elemento de item do carrinho
    createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="./assets/img/cafes/${this.getImageFileName(item.name)}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                <p class="cart-item-quantity">Quantidade: ${item.quantity}</p>
            </div>
            <button class="btn remove-item" data-name="${item.name}">&times;</button>
        `;
        return cartItem;
    }

    // Método auxiliar para obter o nome do arquivo de imagem do produto
    getImageFileName(productName) {
        return `${productName.toLowerCase().replace(/\s/g, '-')}.png`;
    }

    // Método para abrir ou fechar o carrinho
    toggleCart() {
        this.cartSidebar.classList.toggle('open');
    }

    closeCart() {
        this.cartSidebar.classList.remove('open');
    }
}

// Inicializa a instância do Carrinho de Compras
const shoppingCart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.getElementById('searchContainer');
    const searchField = document.getElementById('searchField');

    // Adiciona evento de clique ao ícone de busca
    searchIcon.addEventListener('click', function() {
        searchContainer.classList.toggle('active'); // Alternar a classe 'active' para mostrar/esconder o campo de pesquisa
        searchField.focus(); // Foca no campo de pesquisa ao clicar no ícone de busca
    });
});
