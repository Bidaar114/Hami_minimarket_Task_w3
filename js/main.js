import { renderProducts, getProductById } from './products.js';
import { Cart } from './cart.js';



//burger
let burger = document.querySelector('.burger');
let navigation = document.querySelector('nav');
let navLinks = document.getElementById('nav_links');





burger.addEventListener('click', () => {
     burger.classList.toggle('active');
     navigation.classList.toggle('active');
   
});

navLinks.addEventListener('click', () => {
    navigation.classList.remove('active');
     burger.classList.remove('active');
});




const cart = new Cart();




// UI references
const cartBtn = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const closeCartBtn = document.getElementById('close-cart');
const toast = document.getElementById('toast');





function format(n){ return n.toFixed(2); }
function openCart(){ cartSidebar.classList.remove('hidden'); }
function closeCart(){ cartSidebar.classList.add('hidden'); }


cartBtn.addEventListener('click', ()=>{
openCart();
});

closeCartBtn.addEventListener('click', closeCart);


// delegate Add to Cart
document.body.addEventListener('click', e => {
if(e.target.matches('.add-to-cart')){
const id = e.target.dataset.id;
const product = getProductById(Number(id));

cart.addItem(product, 1);

showToast(`${product.name} added to cart`);
}
});


function showToast(msg){
toast.classList.remove('hidden');
toast.textContent = msg;
setTimeout(() => toast.classList.add('hidden'), 2000);
}


function updateCartUI(){
cartCount.textContent = cart.count();
cartCount.classList.add("active");
subtotalEl.textContent = format(cart.subtotal());
taxEl.textContent = format(cart.tax());
totalEl.textContent = format(cart.total());
cartItemsEl.innerHTML = '';
cart.items.forEach(item => {
cartItemsEl.innerHTML += `
<ul class="cart-item">
<li class="name">${item.name}</li>
<li class="qty">${item.qty}</li>
<li class="plus"   data-id="${item.id}">+</li>
<li class="minus"  data-id="${item.id}">-</li>
<li class="price"> $${item.price}</li>
<li class="total"> $${item.price * item.qty}</li>   </ul>`;
});
}



window.addEventListener('cartUpdated', updateCartUI);
updateCartUI();



document.body.addEventListener('click', e => {
if(e.target.matches('.plus')){   
const id = e.target.dataset.id;
const product = getProductById(Number(id));



cart.updateQty(Number(id), product.qty );
showToast(`${product.name} Qty Updated successfully`);
}
});


document.body.addEventListener('click', e => {
if(e.target.matches('.minus')){
const id = e.target.dataset.id;
const product = getProductById(Number(id));

cart.removeItem(Number(id));
showToast(`${product.name} Item Removed successfully`);
}

updateCartCount();
});

const updateCartCount = () => {
    if(cart.count() === 0){
cartCount.classList.remove("active");
}
}

updateCartCount();










