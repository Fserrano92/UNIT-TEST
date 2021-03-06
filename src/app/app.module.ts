import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoReviewComponent } from './public/components/pico-review/pico-review.component';
import { ProductsComponent } from './public/components/products/products.component';
import { TokenInterceptor } from './public/interceptors/token.interceptor';
import { PersonComponent } from './public/components/person/person.component';
import { PeopleComponent } from './public/components/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PicoReviewComponent,
    PersonComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
