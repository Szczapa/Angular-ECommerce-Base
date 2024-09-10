import { Component } from '@angular/core';
import {NavComponent} from "../../components/nav/nav.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../utils/productType";
import {CartService} from "../../services/cart.service";
import {CartItemType} from "../../utils/cartType";
import {OrderPricePipe} from "../../utils/pipe/order-price.pipe";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavComponent,
    ProductCardComponent,
    OrderPricePipe,
    FormsModule
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

 selectedOrder: 'asc' | 'desc' = 'asc';
  search: string = ''

  sortProductsByPrice(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    this.selectedOrder = selectElement.value as 'asc' | 'desc'

  }

}
