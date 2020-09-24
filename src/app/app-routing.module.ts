import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'bike/:id', component: ProductDetailsComponent },
      {
        path: 'form',
        loadChildren: () =>
          import('./module/lazy/lazy.module').then((m) => m.LazyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
