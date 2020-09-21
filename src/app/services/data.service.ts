import { Injectable } from '@angular/core';
import { Bike } from '../model/bikes';
import { BIKES } from '../../assets/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getBike(id: number): Observable<Bike> {
    return this.getBikes().pipe(
      map((bikes) => bikes.find((bike) => bike.id === id))
    );
  }
  constructor() {}

  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }
}
