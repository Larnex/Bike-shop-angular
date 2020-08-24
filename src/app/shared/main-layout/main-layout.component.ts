import { Component, OnInit, HostListener } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  sourceVideo = '../../../assets/bike.mp4';
  navbarOpen: boolean = false;
  public innerWidth: any;
  constructor() {}

  ngOnInit(): void {}

  showNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
