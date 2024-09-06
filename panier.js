document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cartCount') || document.createElement('span');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Initialiser le compteur du panier depuis le stockage local
    let cartItemCount = parseInt(localStorage.getItem('cartItemCount')) || 0;
    updateCartCount();

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItemCount;
        }
        localStorage.setItem('cartItemCount', cartItemCount);
    }

    // Fonction pour ajouter un article au panier
    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cart));
        cartItemCount++;
        updateCartCount();
    }

    // Ajouter un événement à chaque bouton "Ajouter au panier"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                id: button.getAttribute('data-id'),
                title: button.getAttribute('data-title'),
                price: button.getAttribute('data-price')
            };
            addToCart(item);
        });
    });
});
