let products = []; // You should fetch or import product data
let currentPage = 1;
const productsPerPage = 6;

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageInfo = document.getElementById('page-info');
const container = document.getElementById('product-container');

function displayProducts(filtered = products) {
  container.innerHTML = "";

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedItems = filtered.slice(start, end);

  paginatedItems.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p class="rating">⭐ ${product.rating}</p>
        <p>${product.category}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });

  updatePaginationButtons(filtered);
}

function updatePaginationButtons(filtered) {
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    applyFilters();
  }
});

nextBtn.addEventListener('click', () => {
  const filtered = getFilteredProducts();
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(filtered);
  }
});

function applyFilters() {
  const filtered = getFilteredProducts();
  displayProducts(filtered);
}

function getFilteredProducts() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  let filtered = products.filter(p => 
    p.name.toLowerCase().includes(search) &&
    (category === 'all' || p.category === category)
  );

  const sort = document.getElementById('sort').value;
  if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating-high') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

// Initial load
window.addEventListener('DOMContentLoaded', () => {
  // Assume products are fetched or imported
  products = productData; // from data.js
  applyFilters();
});

// Update filters when user interacts
document.getElementById('search').addEventListener('input', () => {
  currentPage = 1;
  applyFilters();
});

document.getElementById('category').addEventListener('change', () => {
  currentPage = 1;
  applyFilters();
});

document.getElementById('sort').addEventListener('change', () => {
  currentPage = 1;
  applyFilters();
});

// Sample cart counter
let cartCount = 0;
function addToCart(name) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  alert(`${name} added to cart!`);
}
