import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private whichForm = new BehaviorSubject<string>('Form');

  currentForm = this.whichForm.asObservable();

  constructor() {}

  changeForm(form: string) {
    this.whichForm.next(form);
  }
}
