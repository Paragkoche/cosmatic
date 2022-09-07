import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { count_product_in_bag, count_product_in_like } from 'src/db';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cookies: CookieService, private route: Router) {}
  isOpen = false;
  _id: string | undefined;
  async ngOnInit() {
    this._id = this.cookies.get('id');
    setInterval(async () => {
      this._bag_count = await count_product_in_bag();
      this._like_count = await count_product_in_like();
      if (window.location.pathname == '/home') {
        const li: any = document.getElementById('home');
        const cata: any = document.getElementById('cata');
        cata.classList.remove('active');
        li.classList.add('active');
      } else if (window.location.pathname == '/catalog') {
        const li: any = document.getElementById('home');
        const cata: any = document.getElementById('cata');
        cata.classList.add('active');
        li.classList.remove('active');
      } else {
        const li: any = document.getElementById('home');
        const cata: any = document.getElementById('cata');
        cata.classList.remove('active');
        li.classList.remove('active');
      }
    }, 1);
  }
  _bag_count: number = 0;
  _like_count: number = 0;
  gotohome() {
    this.route.navigateByUrl('/');
  }
  gotoCatalog() {
    this.route.navigateByUrl('/catalog');
  }
  gotobag() {
    this.route.navigateByUrl('/bag');
  }
  gotoabout() {
    const ele: any = document.getElementById('aboutus');
    ele.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  openNav() {
    const nav: any = document.getElementById('mobile-nav');
    const btn: any = document.getElementById('button');
    if (this.isOpen) {
      nav.style.transform = 'translateX(-100%)';
      btn.attributes.getNamedItem('data-icon').value =
        'eva:bar-chart-2-outline';
      btn.style.transform = 'rotate(270deg)';
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
      nav.style.transform = 'translateX(0%)';
      btn.attributes.getNamedItem('data-icon').value = 'fe:bar';
      btn.style.transform = 'rotate(0deg)';
    }
    this.isOpen = !this.isOpen;
  }
  goto() {
    this.route.navigateByUrl('/login');
  }
}
