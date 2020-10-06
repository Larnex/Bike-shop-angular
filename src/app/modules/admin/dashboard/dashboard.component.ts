import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Bike } from 'src/app/interfaces/bikes';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: Bike[];
  subscription: SubscriptionLike;
  selectedRemove: Array<any>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getBikes().subscribe((products) => {
      this.products = products;
    });

    this.dataService.getKeys().subscribe((keys) => {
      this.selectedRemove = keys;
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
