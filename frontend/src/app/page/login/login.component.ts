import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Apollo,gql} from "apollo-angular"
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private froms: FormBuilder,private apollo:Apollo,private cookies:CookieService) {}
  login_data = this.froms.group({
    email: '',
    password: '',
  });
  button_value = 'Submit';
  error = '';
  submit() {
    if (this.login_data.valid) {
      this.button_value = 'Loading';
      this.apollo.mutate({
        mutation:gql` 
        LoginUser(
          email:"${this.login_data.value.email}",
          password:"${this.login_data.value.password}"
        ){
          _id
        }
        
        `
      }).subscribe(({data}:any)=>{
          this.cookies.putObject("id",data)
          console.log(data);
          
      },(err)=>{
        console.log(err);
        
      })
    } else {
      this.button_value = 'Form not valid 😒';
      setTimeout(() => {
        this.button_value = 'Submit';
      }, 2000);
    }
  }
  ngOnInit(): void {}
}
