import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  isLoading = false;
  registerForm!:FormGroup;

  constructor(private AuthService:AuthService){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]}),
    });
  }

  onRegister(){
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value.email)
    console.log(this.registerForm.value.password)

    this.AuthService.registerUser(this.registerForm.value.email,this.registerForm.value.password);

    console.log("s")

    this.registerForm.reset()
  }

}
