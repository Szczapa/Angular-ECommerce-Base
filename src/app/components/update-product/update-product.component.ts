import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductType} from "../../utils/productType";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  originalProductName: string | null | undefined;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    imageUrl: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  errorMessages: string[] = [];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.originalProductName = this.route.snapshot.paramMap.get('name');
    const product = this.productService.getProducts().find(p => p.name === this.originalProductName);
    if (product) {
      this.productForm.setValue({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl || '',
        stock: product.stock
      });
    }
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

    this.productService.updateProduct(this.originalProductName!, this.productForm.value as ProductType);
    this.productForm.reset();
    this.router.navigate(['/admin']);
  }
}
