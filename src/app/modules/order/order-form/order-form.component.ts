import { Component, OnInit } from '@angular/core';
import { Bike } from '../../../interfaces/bikes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  bikes: Bike[];
  subscription: SubscriptionLike;
  selectedValue: string;
  isLinear = true;
  selectedBike: Object;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthormGroup: FormGroup;

  summarizeGroup: FormGroup;

  paymentMethods: Object = ['Cash', 'Paypal', 'Card'];

  date: Date;

  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(
    private dataService: DataService,
    private _formBuilder: FormBuilder
  ) {
    this.maxDate.setDate(this.minDate.getDate() + 7);
  }

  addToday(event) {
    event.stopPropagation();
    this.date = new Date();
  }
  addTomorrow(event) {
    event.stopPropagation();
    this.date = new Date(new Date().setDate(new Date().getDate() + 1));
  }

  ngOnInit(): void {
    this.subscription = this.dataService
      .getBikes()
      .subscribe((bikes) => (this.bikes = bikes));

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      paymentType: [null, Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
    });
  }

  assignDescription(event: any) {
    this.firstFormGroup.get('name').setValue(event.value.name);
    this.firstFormGroup.get('description').setValue(event.value.description);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
