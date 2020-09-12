import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Bike } from '../../bikes';
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

// Custom Pipe to limit characters for description
@Pipe({
  name: 'charLimit',
})
export class CharLimitPipe implements PipeTransform {
  transform(value: string, limit: number = 35, trail: String = '...'): string {
    let result = value || '';

    if (value) {
      const words = value.split(/\s+/);

      if (words.length > Math.abs(limit)) {
        if (limit < 0) {
          limit *= -1;
          result =
            trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
          result = words.slice(0, limit).join(' ') + trail;
        }
      }
    }

    return result;
  }
}
