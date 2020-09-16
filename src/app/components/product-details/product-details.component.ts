import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Bike } from 'src/app/model/bikes';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  bike: Bike;
  zoomImage: Boolean = false;
  descriptionLength = 100;

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
        this.dataService.getBike(id).then((bike) => (this.bike = bike));
      }
    });
  }
}
