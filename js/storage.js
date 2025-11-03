export const CART_KEY = 'hami_cart';


export function saveCart(cart){
try{
localStorage.setItem(CART_KEY, JSON.stringify(cart));
}catch(e){
console.error('Could not save cart', e);
}
}


export function loadCart(){
try{
const raw = localStorage.getItem(CART_KEY);
if(!raw) return { items: [] };
return JSON.parse(raw);
}catch(e){
console.error('Could not load cart', e);
return { items: [] };
}
}


export function clearCart(){
localStorage.removeItem(CART_KEY);
}