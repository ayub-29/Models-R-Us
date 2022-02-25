import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <app-navbar></app-navbar>
    <div id="page" class="container-lg container-fluid mt-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }


