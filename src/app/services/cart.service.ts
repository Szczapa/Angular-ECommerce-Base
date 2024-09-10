import { Injectable } from '@angular/core';
import { CartItemType } from '../utils/cartType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItemType[] = [];
  private cartSubject = new BehaviorSubject<CartItemType[]>(this.cart);

  constructor() {
    const CartStored = localStorage.getItem('cart');
    if (CartStored) {
      this.cart = JSON.parse(CartStored);
      this.cartSubject.next(this.cart);
    }
  }

  // Retourne l'observable pour que les composants puissent s'abonner
  getCartObservable(): Observable<CartItemType[]> {
    return this.cartSubject.asObservable();
  }

  getCart(): CartItemType[] {
    return this.cart;
  }

  addToCart(product: CartItemType) {
    const existingProduct = this.cart.find(p => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
      existingProduct.stock -= product.stock;
    } else {
      this.cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  deleteFromCart(product: CartItemType): void {
    const index = this.cart.findIndex(p => p.name === product.name);
    if (index !== -1) {
      this.cart[index].quantity -= product.quantity;
      this.cart[index].stock += product.stock;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }
}
