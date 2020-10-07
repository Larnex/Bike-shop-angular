import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Bike } from 'src/app/interfaces/bikes';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  form: FormGroup;
  bike: Bike;

  submitted = false;

  colors = ['Blue', 'Grey', 'Orange', 'Black', 'Green'];
  size = ['XXL', 'XL', 'L', 'M', 'S'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addFormControls();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFormControls() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.dataService.getBike(params['id']);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((bike) => {
        this.bike = bike;
        this.form = this._formBuilder.group({
          key: this.bike.key,
          id: new FormControl(this.bike.id, Validators.required),
          imgUrl: new FormControl(this.bike.imgUrl, Validators.required),
          price: new FormControl(this.bike.price, Validators.required),
          discount: new FormControl(this.bike.discount, Validators.required),
          main: new FormControl(this.bike.main, Validators.required),
          shop: new FormControl(this.bike.shop, Validators.required),
          name: new FormControl(this.bike.name, Validators.required),
          description: new FormControl(
            this.bike.description,
            Validators.required
          ),
          shipping: new FormControl(this.bike.shipping, Validators.required),
          discountUntil: new FormControl(
            this.bike.discountUntil,
            Validators.required
          ),
          new: new FormControl(this.bike.new, Validators.required),
          color: [this.bike.color],
          size: [this.bike.size],
        });
      });
  }

  uploadImage(event): void {
    const file = event.target.files[0];
    const filePath = `/${file.name}`;

    this.dataService
      .uploadImage(file, filePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe((link) => {
        this.form.get('imgUrl').setValue(link);
      });
  }

  checkboxColors(checked: boolean, index: number) {
    const checkedColors = this.form.get('color').value || [];
    const color = this.colors[index];
    if (checked && checkedColors.indexOf(color) < 0) {
      const orderColors = [...checkedColors, color].sort(
        (a, b) => this.colors.indexOf(a) - this.colors.indexOf(b)
      );
      this.form.get('color').setValue(orderColors);
    }
    if (!checked) {
      const result = checkedColors.filter((x) => x != color);
      this.form.get('color').setValue(result.length > 0 ? result : null);
    }
  }

  checkboxSize(checked: boolean, index: number) {
    const checkedSize = this.form.get('size').value || [];
    const size = this.size[index];
    if (checked && checkedSize.indexOf(size) < 0) {
      const ordersizes = [...checkedSize, size].sort(
        (a, b) => this.size.indexOf(a) - this.size.indexOf(b)
      );
      this.form.get('size').setValue(ordersizes);
    }
    if (!checked) {
      const result = checkedSize.filter((x) => x != size);
      this.form.get('size').setValue(result.length > 0 ? result : null);
    }
  }

  formSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.dataService.updateProduct(this.form.value);

    this.submitted = false;
    this.router.navigate(['/admin', 'dashboard']);
  }
}
