import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './page/landing/landing.component';
import { CookieModule } from 'ngx-cookie';
import { ProductInfoComponent } from './page/product-info/product-info.component';
import { LoginComponent } from './page/login/login.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ReviewComponent } from './components/review/review.component';
import { CatalogComponent } from './page/catalog/catalog.component';
import { BagComponent } from './page/bag/bag.component';
import { LikeComponent } from './page/like/like.component';
import { SwiperModule } from 'swiper/angular';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    ProductInfoComponent,
    LoginComponent,
    SignUpComponent,
    ProductComponent,
    ReviewComponent,
    CatalogComponent,
    BagComponent,
    LikeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CookieModule.withOptions(),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8000',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
