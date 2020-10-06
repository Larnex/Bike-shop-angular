import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() starId;
  @Input() rating;

  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onStarEnter(): void {
    this.starEnter.emit(this.starId);
  }

  onStarLeave(): void {
    this.starLeave.emit();
  }

  onStarClicked(): void {
    this.starClicked.emit(this.starId);
  }
}
