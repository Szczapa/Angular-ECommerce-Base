import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../utils/productType";
import {CartService} from "../../services/cart.service";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {CartItemType} from "../../utils/cartType";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  cartItems: CartItemType[] = [];

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  constructor(private cartService: CartService) {

  }

  removeFromCart(product: CartItemType) {
    this.cartService.deleteFromCart(product);
    this.cartItems = this.cartService.getCart();
  }
}
