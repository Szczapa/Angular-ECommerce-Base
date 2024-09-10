import {Component, EventEmitter, Input, OnInit, Output, output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ProductType} from "../../utils/productType";
import {CartItemType} from "../../utils/cartType";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductType;
  @Input() productType!: CartItemType;
  @Input() view: 'global' | 'cart' = 'global';

  @Output() addToCart = new EventEmitter<CartItemType>();
  @Output() deleteEvent = new EventEmitter<CartItemType>();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    console.log(this.product);
  }

  addToCartClicked() {
    if (this.product.stock === 0) {
      console.log('click and out of stock');
      return;
    }
    const cartItem: CartItemType = {...this.product, quantity: 1};
    this.addToCart.emit(cartItem);
  }

  deleteToCartClicked() {
    const cartItem: CartItemType = {...this.product, quantity: 1};
    this.deleteEvent.emit(cartItem);
  }
}

