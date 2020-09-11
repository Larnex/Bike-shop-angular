import { Injectable } from '@angular/core';
import { Bike } from '../assets/bikes';
import { BIKES } from '../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }
}
