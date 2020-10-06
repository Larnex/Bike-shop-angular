import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Bike } from '../interfaces/bikes';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private db: AngularFireDatabase) {}

  getBikes(): Observable<any[]> {
    return this.db.list('/').valueChanges();
  }

  getBike(id: number): any {
    return this.getBikes().pipe(
      map((bikes) => bikes.find((bike) => bike['id'] === id))
    );
  }

  addProduct(product): void {
    this.db.list('/').push(product);
  }
}
