import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Bike } from 'src/app/interfaces/bikes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  form: FormGroup;
  submitted = false;

  colors = ['Blue', 'Grey', 'Orange', 'Black', 'Green'];
  size = ['XXL', 'XL', 'L', 'M', 'S'];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.getId();
    this.addFormControls();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFormControls(): void {
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
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
      review: new FormControl(null),
    });
  }

  getId(): void {
    this.dataService
      .getBikes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((bikes) => {
        bikes.map((bike) => this.form.get('id').setValue(bike.id + 1));
      });
  }

  uploadImage(event): void {
    const file = event.target.files[0];
    const filePath = `/${file.name}`;

    this.dataService
      .uploadImage(file, filePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe((link) => this.form.get('imgUrl').setValue(link));
  }

  addCheckboxData(event): void {
    const formArray: FormArray =
      event.target.classList.value === 'colors'
        ? (this.form.get('color') as FormArray)
        : (this.form.get('size') as FormArray);

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  formSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const bike: Bike[] = this.form.value;
    this.dataService.addProduct(bike);
  }
}
