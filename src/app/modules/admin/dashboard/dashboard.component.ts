import { Component, OnInit } from '@angular/core';

import { Bike } from 'src/app/interfaces/bikes';
import { DataService } from 'src/app/services/data.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: Bike[];
  subscription: SubscriptionLike;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getBikes().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeProduct(id) {
    this.dataService.deleteProduct(id);
  }
}
