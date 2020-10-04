import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Bike } from 'src/app/interfaces/bikes';
import { DataService } from '../../services/data.service';

// import icons
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  // Icons
  faCart = faShoppingCart;
  faMagic = faMagic;

  subscription: SubscriptionLike;
  bike: any;
  showReviews: Boolean = false;
  zoomImage: Boolean = false;
  descriptionLength = 100;
  selectedColor: string = 'Select a color';
  selectedSize: string = 'Select a size';

  getRating(rate: number[]): number | null {
    if (rate.length === 0) return 0;
    return rate.map((x) => x['rating']).reduce((a, b) => a + b / rate.length);
  }

  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;

  onStarEnter(starId: number) {
    this.hoverState = starId;
  }

  onStarLeave() {
    this.hoverState = 0;
  }

  onStarClicked(starId: number) {
    this.rating = starId;
  }

  getColor(discount: number): string | null {
    return discount > 70
      ? 'red'
      : discount > 60
      ? 'pink'
      : discount > 50
      ? 'orange'
      : null;
  }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.subscription = this.dataService
          .getBike(id)
          .subscribe((bike) => (this.bike = bike));
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
