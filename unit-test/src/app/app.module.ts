import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './public/components/products/products.component';
import { PicoReviewComponent } from './public/components/pico-review/pico-review.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PicoReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
