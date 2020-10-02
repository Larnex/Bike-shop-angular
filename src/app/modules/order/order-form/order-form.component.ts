import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Bike } from '../../../interfaces/bikes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../service/form.service';

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
  form: string;

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
    private _formBuilder: FormBuilder,
    private router: Router,
    private formService: FormService
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
      country: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      paymentType: [null, Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
    });

    this.formService.currentForm.subscribe((form) => (this.form = form));
  }

  assignDescription(event: any) {
    this.firstFormGroup.get('name').setValue(event.value.name);
    this.firstFormGroup.get('description').setValue(event.value.description);
  }

  get bikeName() {
    return this.firstFormGroup.get('name');
  }

  get bikeDescription() {
    return this.firstFormGroup.get('description');
  }

  get country() {
    return this.secondFormGroup.get('country');
  }

  get city() {
    return this.secondFormGroup.get('city');
  }

  get address() {
    return this.secondFormGroup.get('address');
  }

  get payment() {
    return this.thirdFormGroup.get('paymentType');
  }

  get getDate() {
    return this.fourthFormGroup.get('date');
  }

  onSubmit(f: NgForm) {
    type newForm = {
      bikeName: string;
      bikeDescription: string;
      country: string;
      city: string;
      address: string;
      payment: string;
      date: string;
    };

    const newF = {} as newForm;

    newF.bikeName = this.bikeName.value;
    newF.bikeDescription = this.bikeDescription.value;
    newF.country = this.country.value;
    newF.city = this.city.value;
    newF.address = this.address.value;
    newF.payment = this.payment.value;
    newF.date = this.getDate.value;

    this.router.navigate(['/form/successful']);
  }

  thisForm() {
    this.formService.changeForm('order');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
