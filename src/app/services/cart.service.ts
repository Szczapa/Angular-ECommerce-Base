import {Injectable} from '@angular/core';
import {CartItemType} from '../utils/cartType';
import {BehaviorSubject, Observable} from 'rxjs';
import {StockService} from './stock.service';
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItemType[] = [];
  private cartSubject = new BehaviorSubject<CartItemType[]>(this.cart);

  constructor(private stockService: StockService, private productService: ProductService) {
    const CartStored = localStorage.getItem('cart');
    if (CartStored) {
      this.cart = JSON.parse(CartStored);
      this.cartSubject.next(this.cart);
    }
  }

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
    this.updateStock(product, 'decrease');
    this.cartSubject.next(this.cart);
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
    this.updateStock(product, 'increase');
    this.cartSubject.next(this.cart);
  }

  private updateStock(product: CartItemType, action: 'increase' | 'decrease') {
    const products = this.productService.getProducts();
    const existingProduct = products.find(p => p.name === product.name);

    console.log("existingProduct:",existingProduct);
    console.log("existingProduct quantity:",product);
    if (existingProduct) {
      const updatedStock = action === 'decrease'
        ? existingProduct.stock - product.quantity
        : existingProduct.stock + product.quantity;

      const stockProduct = {
        ...existingProduct,
        stock: updatedStock
      };

      this.stockService.updateStock(stockProduct);
    }
  }
}
