import { Component, OnInit } from '@angular/core';
import { BIKES } from 'src/assets/data';
import { Bike } from '../../model/bikes';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getBikes();
  }

  showDetails: boolean = false;

  getBikes(): void {
    this.dataService.getBikes().subscribe((bikes) => (this.bikes = bikes));
  }

  bikes: Bike[];
}
