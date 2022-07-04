import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './public/components/people/people.component';
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
    path: 'people', 
    component: PeopleComponent
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
