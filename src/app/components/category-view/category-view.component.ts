import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Category, Product     } from '../../models/product.model';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-category-view',
  template: `
      <div id="category" class="container-lg container-fluid">
        <div class="row row-cols-1 row-cols-lg-4 g-4">
          <div *ngIf="category">
            <app-category-card [category]="category" routerLink="/"></app-category-card>
          </div>
          <div class="col col-lg-9">
            <div id="product-columns">
              <div id="product-list-column">
                <div id="product-list-scroller">
                  <div id="product-list" class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action product-card"
                      *ngFor="let product of products"
                      [ngClass]="{'active': this.selected && product.id === this.selected.id }"
                      [routerLink]="'/products/' + product.id">
                      {{ product.name }}
                    </a>
                  </div>
                </div>
              </div>
              <div id="product-info">
                <ng-template [ngIf]="selected" [ngIfElse]="noProduct">
                  <app-product-details [product]="selected"></app-product-details>
                </ng-template>
                <ng-template #noProduct>
                  <div class="card">
                    <div class="card-body">
                      <p class="card-text text-center">Select a product</p>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class CategoryViewComponent implements OnInit {
  products: Product[] = [];

  category?: Category;
  selected?: Product;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private router: Router,
    private api: ProductService,
    
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      if (params.has('catId')) {
        this.showCategory(+params.get('catId')!);
      } else if (params.has('prodId')) {
        this.showProduct(params.get('prodId')!); // assign product to this.selected
      } else {
        this.router.navigate(['/']);
      }
    });
  }



  showCategory(catId: number) {
    this.api.getCategoryById(catId).subscribe({
      next: (category) => {
        this.category = category;
        this.api.getProductsByCategory(this.category.id).subscribe({
          next: (products: Product[]) => {
            this.products = products;
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      this.title.setTitle(this.selected ? this.selected.name : category.name);
      },
      error: (error) => {
        this.router.navigate(['/']);
      }
    });
  }

  showProduct(prodId: string) {
    this.api.getProductById(prodId!).subscribe({
      next: (product: any) => {
        this.selected = product[0];
        this.showCategory(product[0].catId);
      },
      error: (error) => {
        this.router.navigate(['/']);
      }
    });

  }




}
