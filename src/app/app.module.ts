declare var google: any;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
// icons
import { IonicModule } from '@ionic/angular';
// carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';
// agm
import {} from 'googlemaps';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './components/app.component';
import { CommonModule } from '@angular/common';

import { DataService } from './services/data.service';
//pipes
import { CharLimitPipe } from './pipes/character-limit.pipe';
import { NgStringPipesModule } from 'ngx-pipes';
// rating as stars
import { StarRatingComponent } from './components/product-details/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ContactPageComponent,
    ProductDetailsComponent,
    CharLimitPipe,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IvyCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDD9woHUDfiRIDQFZdRnY-nckUjlsUvjyQ',
    }),
    NgStringPipesModule,
    FontAwesomeModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
