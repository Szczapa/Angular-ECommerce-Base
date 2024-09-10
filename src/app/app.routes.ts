import {Routes} from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {CartComponent} from "./pages/cart/cart.component";
import {AdminComponent} from "./pages/admin/admin.component";

export const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent}
];
