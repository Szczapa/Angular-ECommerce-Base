import { Component } from '@angular/core';
import {NavComponent} from "../../components/nav/nav.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../utils/productType";
import {CartService} from "../../services/cart.service";
import {CartItemType} from "../../utils/cartType";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavComponent,
    ProductCardComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  products: ProductType[];

  constructor(productService: ProductService, private cartService: CartService) {
   this.products = productService.getProducts()
  }

  addProductToCard(product: CartItemType) {
    this.cartService.addToCart(product)
  }

  sortProductsByPrice() {
    this.products.sort((a, b) => a.price - b.price);
  }

}
