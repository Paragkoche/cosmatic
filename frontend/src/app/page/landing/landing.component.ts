import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo,gql} from "apollo-angular"
import { Data } from './type';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  gotoinsta = (code: string) => {
    window.open('https://www.instagram.com/p/' + code, '__blank');
  };
  slide = [
    [
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/NightRoutine.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/LipCareRoutine.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/ShowerBathRoutine.thumb.800.400.png',
    ],
    [
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/ClarifyDetoxRoutine.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/HydrationSOSRoutine.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-skin/shop-all/shop-by-routine/KyliesDailyRoutine.thumb.800.400.png',
    ],
    [
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-no-sleep-lip-look.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-extraordinary-lip-look.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-snow-way-bae-glam.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-2-0-photoshoot-bts-look.thumb.800.400.png',
    ],
    [
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/24k-birthday-look.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-everyday-glam-look.thumb.800.400.png',
      'https://kyliecosmetics.com/en-us/kylie-cosmetics/shop-all/kylies-looks/kylies-all-over-gloss-glam.thumb.800.400.png',
      'https://coty.scene7.com/is/image/cotyemea/SUGARLIPSCRUBMODELWEBSIZE2?$SQUARE-575x575-2X$&wid=334&fit=constrain',
    ],
  ];
  slide_con = [0, 45, 90, 135];
  slider_con_mobile = [0, 100, 200, 300];
  curr = 1;
  constructor(private apollo:Apollo) {}
  right() {
    if (this.slide_con[3] != 0) {
      const d1: any = document.getElementById('slide-con-0'),
        d2: any = document.getElementById('slide-con-1'),
        d3: any = document.getElementById('slide-con-2'),
        d4: any = document.getElementById('slide-con-3');

      this.slide_con[0] -= 45;
      this.slide_con[1] -= 45;
      this.slide_con[2] -= 45;
      this.slide_con[3] -= 45;
      d1.style.left = this.slide_con[0].toString() + 'vw';
      d2.style.left = this.slide_con[1].toString() + 'vw';
      d3.style.left = this.slide_con[2].toString() + 'vw';
      d4.style.left = this.slide_con[3].toString() + 'vw';
      this.curr += 1;
    }
  }
  left() {
    if (this.slide_con[0] != 0) {
      const d1: any = document.getElementById('slide-con-0'),
        d2: any = document.getElementById('slide-con-1'),
        d3: any = document.getElementById('slide-con-2'),
        d4: any = document.getElementById('slide-con-3');

      this.slide_con[0] += 45;
      this.slide_con[1] += 45;
      this.slide_con[2] += 45;
      this.slide_con[3] += 45;
      d1.style.left = this.slide_con[0].toString() + 'vw';
      d2.style.left = this.slide_con[1].toString() + 'vw';
      d3.style.left = this.slide_con[2].toString() + 'vw';
      d4.style.left = this.slide_con[3].toString() + 'vw';
      this.curr -= 1;
    }
  }
  right_mobile() {
    if (this.slider_con_mobile[3] != 0) {
      const d1: any = document.getElementById('slide-con-0'),
        d2: any = document.getElementById('slide-con-1'),
        d3: any = document.getElementById('slide-con-2'),
        d4: any = document.getElementById('slide-con-3');

      this.slider_con_mobile[0] -= 100;
      this.slider_con_mobile[1] -= 100;
      this.slider_con_mobile[2] -= 100;
      this.slider_con_mobile[3] -= 100;
      d1.style.left = this.slider_con_mobile[0].toString() + 'vw';
      d2.style.left = this.slider_con_mobile[1].toString() + 'vw';
      d3.style.left = this.slider_con_mobile[2].toString() + 'vw';
      d4.style.left = this.slider_con_mobile[3].toString() + 'vw';
      this.curr += 1;
    }
  }
  left_mobile() {
    if (this.slider_con_mobile[0] != 0) {
      const d1: any = document.getElementById('slide-con-0'),
        d2: any = document.getElementById('slide-con-1'),
        d3: any = document.getElementById('slide-con-2'),
        d4: any = document.getElementById('slide-con-3');

      this.slider_con_mobile[0] += 100;
      this.slider_con_mobile[1] += 100;
      this.slider_con_mobile[2] += 100;
      this.slider_con_mobile[3] += 100;
      d1.style.left = this.slider_con_mobile[0].toString() + 'vw';
      d2.style.left = this.slider_con_mobile[1].toString() + 'vw';
      d3.style.left = this.slider_con_mobile[2].toString() + 'vw';
      d4.style.left = this.slider_con_mobile[3].toString() + 'vw';
      this.curr -= 1;
    }
  }
  data: any;
  insta_data!: Data;
  ngOnInit(): void {
    
    fetch('/assets/instagram.json').then((e)=>{
       e.json().then(e=>{
        console.log(e);
        
        this.insta_data =e.data
      })
    });
    
    this.apollo.watchQuery({
      query: gql`
        {Products {
        price
        gallery{
          url
        }
        name
        _id
      }}
      
      `
    }).valueChanges.subscribe((data:any)=>{
      console.log
      (data.loading)
      console.log(data);
      
      this.data = data?.data?.Products

    })
  }
}
