import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../utils/productType";
import {CartItemType} from "../../utils/cartType";

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
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    image: new FormControl('')
  });

  products: ProductType[] = [];

  constructor(private productService: ProductService) { }

  onSubmit(){
    this.productService.addProduct(this.productForm.value as ProductType);
    this.productForm.reset();
  }

  ngOnInit(){
    this.products = this.productService.getProducts()
  }

  deleteToClicked() {
    const product = this.products.pop();
    console.log(product);
    this.deleteProduct.emit(product);
  }
}

