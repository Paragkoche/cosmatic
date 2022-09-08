import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  constructor(private apollo: Apollo) {}
  _Prodects: any = [];
  _start: number = 0;
  sub_cat: {
    [key in string]: Array<string>;
  } = {
    Lips: [
      'Lip Kits',
      'Liquid lipsticks',
      'Lip Glosses',
      'Lip Liners',
      'Lip Blushes',
      'Lip Care',
      'Lip shine lacquers',
      'Lip finishes',
    ],
    Eyes: ['Eyeliner', 'Lashes'],
    Eyebrows: ['Brow kits', 'Brow pencils', 'Brow gel'],
  };
  head = Object.keys(this.sub_cat);
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            Products {
              price
              gallery {
                url
              }
              name
            }
          }
        `,
      })
      .valueChanges.subscribe((data: any) => {
        this._Prodects = data?.data.Products;
        this._start += 20;
      });
  }
  click() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            Products {
              price
              gallery {
                url
              }
              name
            }
          }
        `,
      })
      .valueChanges.subscribe((data: any) => {
        this._Prodects = data.data.Products;
        this._start += 20;
      });
  }
}

/*
{
 lips:[
  "Lip kits"
  ...
 ],
 Eyes:[

 ]
}



*/
