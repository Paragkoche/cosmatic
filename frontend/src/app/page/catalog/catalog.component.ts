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
  _start: number = 20;
  sub_cat_cosmatic: {
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
  sub_cat_skin: { [key in string]: Array<string> } = {
    concerns: [
      'dryness',
      'dullness',
      'sun exposure',
      'shine & excess oil',
      'uneven skintine',
      'large pores',
    ],
  };
  sub_cat_baby: { [key in string]: Array<string> } = {};
  head_consmatic = Object.keys(this.sub_cat_cosmatic);
  head_skin = Object.keys(this.sub_cat_skin);
  head_body = Object.keys(this.sub_cat_baby);
  curr: { [key in string]: Array<string> } = this.sub_cat_cosmatic;
  head: string[] = this.head_consmatic;
  // head_consmatic = Object.keys(this.sub_cat_cosmatic);
  onChange = (data: { [key in string]: Array<string> }, head: string[]) => {
    this.curr = data;
    this.head = head;
  };
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            Prodects {
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
        this._Prodects = data?.data.Prodects;
        this._start += 20;
      });
  }
  click() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            Prodects(limit:${this._start}) {
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
        this._Prodects = data.data.Prodects;
        this._start += 20;
      });
  }
}
