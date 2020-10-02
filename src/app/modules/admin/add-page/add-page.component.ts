import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Bike } from 'src/app/interfaces/bikes';
import { MatSingleDateSelectionModel } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  subscription: SubscriptionLike;
  form: FormGroup;
  bikes: Bike[];
  submitted: Boolean = false;

  colors = ['Black', 'Red', 'White', 'Blue', 'Yellow', 'Grey'];
  size = ['XXL', 'XL', 'L', 'M', 'S'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService
      .getBikes()
      .subscribe((bikes) => (this.bikes = bikes));

    this.form = new FormGroup({
      id: new FormControl(
        this.bikes[this.bikes.length - 1].id + 1,
        Validators.required
      ),
      imgUrl: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      discount: new FormControl(null, Validators.required),
      main: new FormControl(null, Validators.required),
      shop: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      shipping: new FormControl(null, Validators.required),
      discountUntil: new FormControl(null, Validators.required),
      new: new FormControl(null, Validators.required),
      color: new FormArray([]),
      size: new FormArray([]),
    });
  }

  check(event) {
    const formArray: FormArray =
      event.target.classList.value === 'colors'
        ? (this.form.get('color') as FormArray)
        : (this.form.get('size') as FormArray);

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
    console.log('formArray:', formArray.value);
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;
    const bike: Bike = {
      id: this.form.get('id').value,
      imgUrl: this.form.get('imgUrl').value,
      price: this.form.get('price').value,
      discount: this.form.get('discount').value,
      main: this.form.get('main').value,
      shop: this.form.get('shop').value,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      shipping: this.form.get('shipping').value,
      discountUntil: this.form.get('discountUntil').value,
      new: this.form.get('new').value,
      color: this.form.get('color').value,
      size: this.form.get('size').value,
      review: null,
    };

    this.bikes.push(bike);
    console.log(this.bikes);
  }
}
