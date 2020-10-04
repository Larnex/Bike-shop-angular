import { Injectable } from '@angular/core';
import { Bike } from '../interfaces/bikes';
import { BIKES } from '../../assets/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  getBikes() {
    return this.db.list('/').valueChanges();
  }

  getBike(id: number) {
    return this.getBikes().pipe(
      map((bikes) => bikes.find((bike) => bike['id'] === id))
    );
  }

  addProduct(product) {
    this.db.list('/').push(product);
  }
}
