import {AbstractControl, ValidationErrors} from '@angular/forms';
import {ProductService} from '../services/product.service';

export function productNameValidator(productService: ProductService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const productName = control.value;
    const productExists = productService.getProducts().some(p => p.name === productName);
    return productExists ? { productNameExists: true } : null;
  };
}
