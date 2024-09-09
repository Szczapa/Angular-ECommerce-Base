import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../utils/productType";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
    name: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0,[Validators.required, Validators.min(0.1)]),
    imageUrl: new FormControl('',[Validators.required])
  });

  products: ProductType[] = [];
  errorMessages: string[] = [];

  constructor(private productService: ProductService) { }

  onSubmit(){
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
      console.log(this.errorMessages);
      return;
    }

    this.productService.addProduct(this.productForm.value as ProductType);
    this.productForm.reset();
  }

  ngOnInit(){
    this.products = this.productService.getProducts();
  }

  // TODO : Patch delete bug (just delete in view, not in the model)
deleteToClicked(index: number) {
  const product = this.products[index];
  if (product) {
    this.products.splice(index, 1);
    this.productService.deleteProduct(index);
  }
}
}

