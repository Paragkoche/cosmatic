import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Apollo,gql} from "apollo-angular"
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private froms: FormBuilder,private apollo:Apollo,private cookies:CookieService) {}
  sign_up = this.froms.group({
    frist_name: '',
    Last_name: '',
    email: '',
    password: '',
    Cpassword: '',
    Street_name_and_house_number: '',
    postcode: '',
    city: '',
    region: '',
    phone_number: '+91',
  });
  button_value = 'Submit';
  error = '';
  submit() {
    if (this.sign_up.valid) {
      if (this.sign_up.value.password === this.sign_up.value.Cpassword) {
        this.button_value = 'Loading';
        this.apollo.mutate({
          mutation:gql`
            AddUser(
              first_name:"${this.sign_up.value.frist_name}",
              Last_name:"${this.sign_up.value.Last_name}",
              email:"${this.sign_up.value.email}",
              password:"${this.sign_up.value.password}",
              addrest:"${this.sign_up.value.Street_name_and_house_number}, ${this.sign_up.value.city}, ${this.sign_up.value.region}, ${this.sign_up.value.postcode}",
              phone_number:"${this.sign_up.value.password?.startsWith('+')? this.sign_up.value.password: '+91' + this.sign_up.value.password}",
              isAdmain:false,
            ){
              #for cookies 
              _id
            }
          
          `
        }).subscribe(
          ({data}:any)=>{
            console.log(data)
            this.cookies.putObject("id",data) // set cookies
            window.location.href = '/'
          },(err)=>{
              console.log(err);
              
          }
        )
      }
    } else {
      this.button_value = 'Form not valid 😒';
      setTimeout(() => {
        this.button_value = 'Submit';
      }, 2000);
    }
  }
  ngOnInit(): void {}
}
