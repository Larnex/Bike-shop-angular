import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Bike } from '../interfaces/bikes';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { keyframes } from '@angular/animations';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getBikes(): Observable<Bike[]> {
    return this.db
      .list('/')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({
            key: a.key,
            ...(a.payload.val() as any),
          }))
        )
      );
  }

  getBike(key: string): Observable<Bike> {
    return this.getBikes().pipe(
      map((bikes) => bikes.find((bike) => bike['key'] === key))
    );
  }

  addProduct(product) {
    this.db.list('/').push(product);
  }

  deleteProduct(product) {
    this.db.list('/').remove(product);
  }

  uploadImage(file, filePath): Observable<string> {
    const ref = this.storage.ref(filePath);
    this.storage.upload(filePath, file);
    return ref.getDownloadURL();
  }
}
