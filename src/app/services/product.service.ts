import {Injectable} from '@angular/core';
import {ProductType} from "../utils/productType";
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: ProductType[] = [];

  constructor() {
    const ProductStored = localStorage.getItem('products');
    if (ProductStored) {
      this.products = JSON.parse(ProductStored);
    }
  }

  addProduct(product: ProductType): void {
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getProducts(): ProductType[] {
    return this.products;
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  updateProduct(originalName: string, updatedProduct: ProductType): void {
    const index = this.products.findIndex(p => p.name === originalName);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
}
