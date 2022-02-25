import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { CartItem} from '../../models/cart.model'; 
import {CartService} from '../../services/cart.service'

@Component({
  selector: 'app-cart-view',
  template: `
      <div id="cart" class="container-lg container-fluid">
        <h1 class="display-6"><a (click)="goBack()" class="back-btn fw-lighter text-dark text-decoration-none"> <i class="bi bi-arrow-left-circle"></i> </a> Cart</h1>
        <app-cart-table [updatable]="true" (onCartUpdate)="cartUpdate($event)"></app-cart-table>
        <div class="row align-items-start">
        <div class="col text-center">

        <div *ngIf="showButton">
          <button class="btn btn-success btn-lg" (click)="goCheckout()">Checkout</button><!-- goto: /checkout -->
        </div>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class CartViewComponent implements OnInit {
  items: CartItem[] = [];
  cart: CartItem[] = [];
  showButton: boolean = false;
  constructor(
    private api: CartService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getCartItem().subscribe({
      next: (carts) => {
        this.items = carts;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cartUpdate(cart: CartItem[]) {
    this.cart = cart;
    if(cart.length > 0){
      this.showButton = true;
    }
    else{
      this.showButton = false;
    }
  }

  goBack() {
    this.location.back();
  }

  goCheckout() {
    this.router.navigate(['/checkout']);
  }
  
  



qtyAsNumber(item: CartItem) {
  item.qty = item.qty ? +item.qty : 0;
}

updateCart(item: CartItem){
  this.api.updateCart(item).subscribe(()=>{
    this.router.navigate(["/"]).then(()=>{
      // do whatever you need after navigation succeeds
      this.router.navigate(["/cart"]);
      alert('Cart updated');
    });
  })
}



}


