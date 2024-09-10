import {Routes} from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {CartComponent} from "./pages/cart/cart.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {isLoggedGuard} from "./utils/guards/is-logged.guard";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";

export const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent,canActivate: [isLoggedGuard], children: [
      {path: 'update/:name', component: UpdateProductComponent},
    ]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];
