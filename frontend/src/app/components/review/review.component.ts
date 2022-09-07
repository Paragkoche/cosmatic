import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() id!: string | null;
  @Input() commend!: string;
  @Input() user_id!: string;
  @Input() user_name!: string;
  @Input() create_at!: string | any;
  constructor() {}

  ngOnInit(): void {
    this.create_at =
      new Date(this.create_at).getDate().toString() +
      '/' +
      new Date(this.create_at).getMonth().toString() +
      '/' +
      new Date(this.create_at).getFullYear().toString();
  }
}
