import { Injectable } from '@angular/core';
import { CartItemType } from '../utils/cartType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItemType[] = [];
  private cartSubject = new BehaviorSubject<CartItemType[]>(this.cart); // Utilisation de BehaviorSubject pour garder la dernière valeur

  constructor() {
    const CartStored = localStorage.getItem('cart');
    if (CartStored) {
      this.cart = JSON.parse(CartStored);
      this.cartSubject.next(this.cart); // Mise à jour du BehaviorSubject avec les données du localStorage
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
    } else {
      this.cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); // Mise à jour du BehaviorSubject pour notifier les abonnés
  }

  deleteFromCart(product: CartItemType): void {
    const index = this.cart.findIndex(p => p.name === product.name);
    if (index !== -1) {
      this.cart[index].quantity -= product.quantity;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); // Mise à jour du BehaviorSubject pour notifier les abonnés
  }
}
