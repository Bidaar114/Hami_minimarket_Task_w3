
import { saveCart, loadCart } from './storage.js';


export class Cart {
constructor(){
const data = loadCart();
this.items = Array.isArray(data.items) ? data.items : [];
this.TAX_RATE = 0.05;
this.DISCOUNT_THRESHOLD = 50; // optional bonus
this.DISCOUNT_RATE = 0.10;
this._emit();

}





_emit(){
saveCart({items: this.items });
// notify UI
window.dispatchEvent(new CustomEvent('cartUpdated', { detail: {count: this.count(), items: this.items } }));

}




findIndex(id){
return this.items.findIndex(i => i.id === id);
}


addItem(product, qty = 1){
const idx = this.findIndex(product.id);
if(idx > -1){
this.items[idx].qty += qty;
} else {
this.items.push({ id: product.id, img:product.img, name: product.name, category: product.category, price: product.price, qty });
}
this._emit();
}


removeItem(id){
const idx = this.findIndex(id);
if(idx > -1){
this.items[idx].qty -= 1;
this._emit();
}
if(this.items[idx].qty === 0)
this.items.splice(idx,1);
this._emit();
}


updateQty(id){
//qty +1
const idx = this.findIndex(id);
if(idx > -1){
this.items[idx].qty += 1;
this._emit();


}
}







count(){
return this.items.reduce((s,i)=> s + i.qty, 0);
}


subtotal(){
return this.items.reduce((s,i)=> s + i.price * i.qty, 0);
}


tax(){
return this.subtotal() * this.TAX_RATE;
}


discount(){
const sub = this.subtotal();
return sub > this.DISCOUNT_THRESHOLD ? sub * this.DISCOUNT_RATE : 0;
}


total(){
return this.subtotal() + this.tax() - this.discount();
}
}