import { Injectable } from '@angular/core';
import { Bike } from '../model/bikes';
import { BIKES } from '../../assets/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getBike(id: number): Promise<Bike> {
    return this.getBikes()
      .toPromise()
      .then((bikes) => bikes.find((bike) => bike.id === id));
  }
  constructor() {}

  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }
}
