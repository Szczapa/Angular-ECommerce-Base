import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductType} from '../utils/productType';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockSubject = new BehaviorSubject<ProductType[]>([]);

  constructor(private productService: ProductService) {
    this.stockSubject.next(this.productService.getProducts());
  }

  getStockObservable() {
    return this.stockSubject.asObservable();
  }

  updateStock(product: ProductType) {
    const products = this.productService.getProducts();
    const productToUpdate = products.find(p => p.name === product.name);
    if (productToUpdate) {
      productToUpdate.stock = product.stock;
      this.stockSubject.next(products);
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
}
