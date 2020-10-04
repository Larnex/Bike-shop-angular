import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Bike } from 'src/app/interfaces/bikes';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  form: FormGroup;
  bikes: any[];
  submitted: Boolean = false;

  colors = ['Black', 'Red', 'White', 'Blue', 'Yellow', 'Grey'];
  size = ['XXL', 'XL', 'L', 'M', 'S'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getBikes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((bikes) => (this.bikes = bikes));

    this.addFormControls();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFormControls() {
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
      review: new FormControl(null),
    });
  }

  addCheckboxData(event) {
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
  }

  formSubmit() {
    if (this.form.invalid) return;

    this.submitted = true;
    const bike: Bike[] = this.form.value;
    this.dataService.addProduct(bike);
  }
}
