import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart.service';
import {AuthService} from "../../services/auth.service";
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  cartSize = 0;
  cartSubscription?: Subscription;
  authSubscription?: Subscription;
  log: boolean = false;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartObservable().subscribe(cart => {
      this.cartSize = cart.reduce((total, item) => total + item.quantity, 0);
    });

    this.authSubscription = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.log = isLoggedIn;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.disconnect();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
