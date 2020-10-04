import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Bike } from '../../interfaces/bikes';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  subscription: SubscriptionLike;

  constructor(private router: Router, private dataService: DataService) {}
  bikes: any[];
  selectedBike: Bike;

  getColor(discount: number): string | null {
    return discount > 70
      ? 'red'
      : discount > 60
      ? 'pink'
      : discount > 50
      ? 'orange'
      : null;
  }

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

  showBikeDetails(bike: any): void {
    this.selectedBike = bike;
    this.router.navigate(['/bike', this.selectedBike.id]);
  }

  showDetails: boolean = false;
}
