import { Component, OnInit } from '@angular/core';
import { address } from './address';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  address = address;
  title = 'Contact Page';
  lat = 54.35189;
  lng = 18.63818;
  constructor() {}

  ngOnInit(): void {}
}
