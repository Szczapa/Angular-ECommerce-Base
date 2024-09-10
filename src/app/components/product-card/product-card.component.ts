import {Component, EventEmitter, Input, OnInit, Output, output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ProductType} from "../../utils/productType";
import {CartItemType} from "../../utils/cartType";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
  @Input() product!: ProductType;
  @Input() productType!: CartItemType;
  @Input() view: 'global' | 'cart' = 'global';

  @Output() addToCart = new EventEmitter<CartItemType>();
  @Output() deleteEvent = new EventEmitter<CartItemType>();


  addToCartClicked() {
    const cartItem: CartItemType = { ...this.product, quantity: 1, stock: 1 };
    this.addToCart.emit(cartItem);
  }

  deleteToCartClicked() {
    const cartItem: CartItemType = { ...this.product, quantity: 1, stock: 1 };
    this.deleteEvent.emit(cartItem);
  }
}

