import { Component, OnInit } from '@angular/core';

import { goods } from '../../assets/goods';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  goods = goods;
  constructor() {}

  ngOnInit(): void {}
}
