import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Category     } from '../../models/product.model';
@Component({
  selector: 'app-category-card',
  template: `
      <div class="col ratio-1x1 square">
          <div class="card category-card bg-dark text-white text-center" data-id="{{ category.id }}" tabindex="0">
            <img src="../../../assets/{{ category.id }}.jpg" class="card-img" alt="{{ category.name }}">
            <div class="card-img-overlay">
              <h3 class="card-title display-6">{{ category.name }}</h3>
            </div>
          </div>
      </div>
  `,
  styles: [
  ]
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;
  constructor() { }

  ngOnInit(): void {
  }

}
