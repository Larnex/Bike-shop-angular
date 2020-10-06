import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormService } from '../service/form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  form: string;
  model: any = {};

  constructor(private formService: FormService, private router: Router) {}

  ngOnInit(): void {
    this.formService.currentForm.subscribe((form) => (this.form = form));
  }

  onSubmit(): void {
    this.router.navigate(['/form/successful']);
  }

  thisForm(): void {
    this.formService.changeForm('contact');
  }
}
