import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input()
  image!: string;
  @Input()
  name!: string;
  @Input()
  price!: string;
  @Input()
  id!: string;
  constructor(private router: Router) {}
  onClick = () => {
    window.location.href = '/product/' + this.id;
  };
  ngOnInit(): void {}
}
