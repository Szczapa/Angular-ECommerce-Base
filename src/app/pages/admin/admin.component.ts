import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {ProductType} from '../../utils/productType';
import {StockService} from '../../services/stock.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  @Output() deleteProduct = new EventEmitter<ProductType>();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    imageUrl: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  products: ProductType[] = [];
  errorMessages: string[] = [];
  private stockSubscription?: Subscription;

  constructor(private productService: ProductService, private stockService: StockService) {
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.errorMessages = [];
      if (this.productForm.controls.name.errors) {
        this.errorMessages.push('Name is required');
      }
      if (this.productForm.controls.price.errors) {
        this.errorMessages.push('Price must be greater than 0');
      }
      if (this.productForm.controls.imageUrl.errors) {
        this.errorMessages.push('Image URL is required');
      }
      if (this.productForm.controls.stock.errors) {
        this.errorMessages.push('Stock must be greater than 0');
      }
      console.log(this.errorMessages);
      return;
    }

    this.productService.addProduct(this.productForm.value as ProductType);
    this.productForm.reset();
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.stockSubscription = this.stockService.getStockObservable().subscribe(stock => {
      this.products = stock;
    });
  }

  ngOnDestroy() {
    if (this.stockSubscription) {
      this.stockSubscription.unsubscribe();
    }
  }

  deleteToClicked(index: number) {
    const product = this.products[index];
    if (product) {
      this.productService.deleteProduct(index);
    }
  }
}
