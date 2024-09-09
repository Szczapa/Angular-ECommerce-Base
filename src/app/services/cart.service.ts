import { Injectable } from '@angular/core';
import { CartItemType } from '../utils/cartType';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItemType[] = [];

  constructor() {
    const CartStored = localStorage.getItem('cart');
    if (CartStored) {
      this.cart = JSON.parse(CartStored);
    }
  }

  getCart(): CartItemType[] {
    console.log(this.cart);
    return this.cart;
  }

  addToCart(product: CartItemType) {
    console.log("addToCart");
    const existingProduct = this.cart.find(p => p.name === product.name);
    if (existingProduct) {
      console.log("existingProduct");
      existingProduct.quantity += product.quantity;
    } else {
      console.log("newProduct");
      this.cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  deleteFromCart(product: CartItemType): void {
    const index = this.cart.findIndex(p => p.name === product.name);
    if (index !== -1) {
      this.cart[index].quantity -= product.quantity;
      if (this.cart[index].quantity < 0) {
        this.cart.splice(index, 1);
      }else if(this.cart[index].quantity === 0){
        this.cart.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
