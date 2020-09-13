import { Component, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { Bike } from '../../model/bikes';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  subscription: SubscriptionLike;

  constructor(private dataService: DataService) {}
  bikes: Bike[];

  ngOnInit(): void {
    this.subscription = this.dataService
      .getBikes()
      .subscribe((bikes) => (this.bikes = bikes));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  showDetails: boolean = false;
}
