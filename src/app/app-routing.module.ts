import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicoReviewComponent } from './public/components/pico-review/pico-review.component';
import { ProductsComponent } from './public/components/products/products.component';

const routes: Routes = [
  {
    path: 'products', 
    component: ProductsComponent
  },
  {
    path: 'pico-review', 
    component: PicoReviewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
