import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';

import { CartItem       } from '../models/cart.model';
import { Product        } from '../models/product.model';
import { ProductService } from './product.service';
import { Shipping } from '../models/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private http: HttpClient,
    private api: ProductService
  ) { }

  getCartItem() { return this.http.get<CartItem[]>('/api/cart'); }
  updateCart(item: CartItem) {
    return this.http.post<CartItem[]>('/api/cart/update', item);
  }

  checkout(info: Shipping){
    return this.http.post<CartItem[]>('/api/cart/checkout', info);
  }
   
}