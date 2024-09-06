// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    // Récupérer le panier depuis le localStorage, ou initialiser un tableau vide s'il n'existe pas
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ajouter le produit au panier si ce n'est pas déjà présent
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Mettre à jour le nombre d'articles dans le panier
    updateCartCount();
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}

// Ajouter les gestionnaires d'événements lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le nombre d'articles dans le panier au chargement de la page
    updateCartCount();

    // Ajouter des gestionnaires d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            // Récupérer les données du produit
            let productId = this.closest('.card').getAttribute('data-id');
            addToCart(productId);
        });
    });
});
