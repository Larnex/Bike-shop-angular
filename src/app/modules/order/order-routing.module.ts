import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: 'order', component: OrderFormComponent },
  { path: 'contact', component: ContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
