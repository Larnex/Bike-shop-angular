import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { Bike } from '../../interfaces/bikes';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  subscription: SubscriptionLike;
  showDetails = false;

  constructor(private router: Router, public dataService: DataService) {}
  bikes: Bike[];
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
    this.dataService.getBikes().subscribe((bikes) => (this.bikes = bikes));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  showBikeDetails(bike: Bike): void {
    this.selectedBike = bike;
    this.router.navigate(['/bike', this.selectedBike.id]);
  }
}
