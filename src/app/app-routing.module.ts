import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'contact', component: ContactPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
