import { Injectable } from '@angular/core';
import { Bike } from '../interfaces/bikes';
import { BIKES } from '../../assets/data';
import { Observable, of, from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  getBikes(): Observable<Bike[]> {
    return of(BIKES);
  }
  getBike(id: number): Observable<Bike> {
    return this.getBikes().pipe(
      map((bikes) => bikes.find((bike) => bike.id === id))
    );
  }
}
