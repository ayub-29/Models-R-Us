import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart.model';
import { Product     } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-details',
  template: `
      <div class="card">
        <div class="card-body">
          <p class="card-text"><small class="text-muted">{{ product.id }}</small></p>
          <h5 class="class-title display-7">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <button type="button" data-id="{{ product.id }}" class="add-to-cart btn btn-primary" tabindex="0" 
            (click)="updateCart(product)">
              Add to cart
            </button>
          </p>
        </div>
        <div class="card-footer text-muted">
          <div class="row row-cols-2">
            <div class="col">
            {{ product.cost | currency }}
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;
  item: CartItem = {id: '', qty: 0};
  constructor(
    private api: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateCart(product: Product){
    this.item = {id: product.id, qty: 1, product: product};
    this.api.getCartItem().subscribe((res)=>{
      const idx = res.findIndex( (element) => element.id === product.id);
      if(idx < 0){
        //Not found
        this.item.qty = 1;
      }
      else{
        this.item.qty = res[idx].qty+1;
      }
      this.api.updateCart(this.item).subscribe(()=>{
        this.router.navigate(["/"]).then(()=>{
          // do whatever you need after navigation succeeds
          this.router.navigate(["/cart"]);
        });
      })
    })
    
    
  }

}
