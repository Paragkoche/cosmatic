import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {Apollo,gql} from "apollo-angular"
import {
  add_cart,
  add_like,
  ischack_product_in_cart,
  ischack_product_in_like,
} from 'src/db';
export interface Product {
  id: string;
  longDescription: string;
  name: string;
  price: string;
  useage: string;
  KeyFeatures: string;
  Details?: null;
  ShppingRestrictions?: null;
  Catagory: string;
  subCatagory: string;
  gallery?: GalleryEntity[];
  reviews?: null[] | null;
  macheProdect?: MacheProdectEntity[];
}
export interface GalleryEntity {
  id: string;
  url: string;
  isImage: boolean;
}
export interface MacheProdectEntity {
  id: string;
  longDescription: string;
  name: string;
  price: string;
  useage: string;
  KeyFeatures: string;
  Details?: null;
  ShppingRestrictions?: null;
  Catagory: string;
  subCatagory: string;
  gallery: GalleryEntity[];
  reviews: Array<null>;
}
// export interface Review {
//   id: string;
//   comment: string;
//   created_at: string;
// }
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private acitve_route: ActivatedRoute,
    private route: Router,
    private apollo:Apollo,
    private cookes: CookieService,
    private FB: FormBuilder
  ) {}
  _Product!: any;
  currimage!: { url: string; isImage: boolean };
  add_bag = async () => {
    if (await ischack_product_in_cart(this._Product.id)) {
      alert('This prodect alrady in cart/bag');
    } else {
      add_cart({
        ...this._Product,
        price:
          (parseFloat(this._Product.price) * this._curr_cat).toString() + '$',
        curr: this._curr_cat,
      });
    }
  };
  add_like = async () => {
    if (await ischack_product_in_like(this._Product.id)) {
      alert('This prodect alrady in Like');
    } else {
      add_like({
        ...this._Product,
        price:
          (parseFloat(this._Product.price) * this._curr_cat).toString() + '$',
        curr: this._curr_cat,
      });
    }
  };
  changImage = (url: string, isImage: boolean) => {
    this.currimage = { url, isImage };
  };
  stoa = (s: any) => {
    try {
      return s.split('", "');
    } catch (e) {}
  };
  show = (id: string) => {
    const li: any = document.getElementById(id);
    const button: any = document.getElementById(id + '-button');
    console.log(button.style);
    if (li.getAttribute('show') == 'true') {
      button.style.transform = 'rotate(0deg)';
      console.log(button.style.transform);

      li.classList.remove('active');
      li.setAttribute('show', 'false');
    } else {
      button.style.transform = 'rotate(180deg)';
      console.log(button.style.transform);
      li.classList.add('active');
      li?.setAttribute('show', 'true');
    }
  };
  _curr_cat = 1;
  add = () => (this._curr_cat += 1);
  sub = () => (this._curr_cat > 1 ? (this._curr_cat -= 1) : 0);
  review_form = this.FB.group({
    comment: '',
  });
  submit() {
    // if (this.review_form.valid)
    //   add_review(this._Product.id, this.review_form.value)
    //     .then(() => {
    //       alert('Your review is added thanyou for review 😊😊');
    //       this.ngOnInit();
    //     })
    //     .catch((e) => {
    //       alert('try again');
    //     });
  }
  ngOnInit(): void {
    const user_id = this.cookes.get('id');
    const id: any = this.acitve_route.snapshot.paramMap.get('id');
    this.apollo.watchQuery({
      query:gql`
      {Product(id:"${id}"){
        longDescription
        name
        price
        usage
        keyFreatuers
        Details
        ShppingRestrictions
        Catagory
        subCatagory
        gallery{
          url
          isImage
        }
        reviews{
          comment
        }
      }}
      `
    }).valueChanges.subscribe((data:any)=>{
      this._Product = data.data.Product
      this.currimage = data.data.Product.gallery[0];
    })
    // if (user_id) {
      
    // }
  }
}
