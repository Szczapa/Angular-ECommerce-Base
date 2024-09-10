import {Injectable} from '@angular/core';
import {ProductType} from "../utils/productType";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: ProductType[] = [
    {
      name: 'Product 1',
      price: 100,
      description: 'Description for product 1',
      imageUrl: 'https://via.placeholder.com/150',
      stock: 0,
    },
    {
      name: 'Product 2',
      price: 200,
      description: 'Description for product 2',
      imageUrl: 'https://via.placeholder.com/150',
      stock: 10,
    },
    {
      name: 'Product 3',
      price: 300,
      description: 'Description for product 3',
      imageUrl: 'https://via.placeholder.com/150',
      stock: 5,
    }
  ];

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
}
