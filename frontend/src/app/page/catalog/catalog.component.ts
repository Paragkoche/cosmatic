import { Component, OnInit } from '@angular/core';
import {Apollo,gql} from "apollo-angular"
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  constructor(private apollo:Apollo) {}
  _Prodects: any = [];
  _start: number = 0;
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
      {
          Products{
          price
          gallery{
            url
          }
          name
        }
      }
      
      `
    }).valueChanges.subscribe((data:any)=>{
      this._Prodects = data?.data.Products
      this._start +=20
    })
  }
  click() {
    this.apollo.watchQuery({
      query: gql`
      {
          Products{
          price
          gallery{
              url
          }
          name
        }
      }
      
      `
    }).valueChanges.subscribe((data:any)=>{
      this._Prodects = data.data.Products
      this._start +=20
    })
  }
}
