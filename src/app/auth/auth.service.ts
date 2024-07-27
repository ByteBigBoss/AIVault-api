import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AluthData } from './auth.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';

import { environment} from "../../environments/environment";


// const BACKEND_URL = "http://ascaorigin.ap-south-1.elasticbeanstalk.com/api" + "/user/";


const BACKEND_URL = "http://localhost:8001/api"+ "/user/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenTimer!: any;

  private isAuthenticeted: boolean = false;

  private token!: string;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    console.log("a-cons")
  }

  getToken(): string {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticeted;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  registerUser(email: string, password: string) {
    const user: AluthData = {
      email: email,
      password: password,
    }

    this.http.post( BACKEND_URL+'add', user).subscribe((res) => {
      this.router.navigate(['/'])
    })

  }

  login(email: string, password: string) {
    const user: AluthData = {
      email: email,
      password: password,
    }


    this.http.post<{ token: string, expiresIn: number }>(BACKEND_URL+'login', user).subscribe((res) => {
      const token = res.token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration)
        this.token = token;
        this.isAuthenticeted = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate =new Date(now.getTime()+expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token,expirationDate);
        this.router.navigate(['/'])
      }
    })
  }

  autoAuthUser(){
    const authInformation =  this.getAuthDate();
    if(!authInformation){
      return
    }
    const now = new Date();
    const expiresIn = (authInformation?.expirationDate as Date).getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation?.token as string;
      this.isAuthenticeted = true;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true)
    }
  }

  logOut() {
    this.token = "";
    this.isAuthenticeted = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/login'])
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(() => {
      this.logOut()
    }, duration*1000)
  }


  private saveAuthData(token:string,expirationDate: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthDate(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration')

    if(!token || !expirationDate){
      return
    }

    return{
      token:token,
      expirationDate: new Date(expirationDate)
    }
  }

}
