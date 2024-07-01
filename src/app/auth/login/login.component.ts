import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;

  isLoading = false;

  constructor(public AuthService:AuthService){

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]}),
    });
  }

  onLogin(){
    if(this.loginForm.invalid){
      return
    }

    this.AuthService.login(this.loginForm.value.email,this.loginForm.value.password);
  }

}
