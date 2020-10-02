import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  form: string;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.currentForm.subscribe((form) => (this.form = form));
  }
}
