import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // S'abonner à l'observable du panier pour recevoir les mises à jour
    this.cartSubscription = this.cartService.getCartObservable().subscribe(cart => {
      // Met à jour la taille du panier avec la quantité totale des produits
      this.cartSize = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement pour éviter des fuites de mémoire
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
