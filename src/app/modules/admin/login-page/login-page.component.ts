import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const admin = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      returnSecureToken: true,
    };

    this.auth.login(admin).subscribe(
      (res) => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
