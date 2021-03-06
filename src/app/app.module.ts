declare var google: any;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
// icons
import { IonicModule } from '@ionic/angular';
// carousel
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
// agm
import {} from 'googlemaps';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './components/app.component';
import { CommonModule } from '@angular/common';

import { DataService } from './services/data.service';
// pipes
import { CharLimitPipe } from './pipes/character-limit.pipe';
import { NgStringPipesModule } from 'ngx-pipes';
// rating as stars
import { StarRatingComponent } from './components/shared/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDD9woHUDfiRIDQFZdRnY-nckUjlsUvjyQ',
    }),
    MDBBootstrapModule.forRoot(),
    NgStringPipesModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    CarouselModule,
    WavesModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
