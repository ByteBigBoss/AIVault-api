import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

    userIsAluthenticated = false;
    private aluthListenerSubs!:Subscription;

    constructor(private AuthService:AuthService){
        console.log("h-c")
    }
 

    ngOnInit(): void {
        this.userIsAluthenticated = this.AuthService.getIsAuth();
       this.AuthService.getAuthStatusListener().subscribe((isAluthenticated)=>{
        this.userIsAluthenticated = isAluthenticated;
       })
    }

    onlogOut(){
        this.AuthService.logOut()
    }

    ngOnDestroy(): void {
        this.aluthListenerSubs.unsubscribe();
    }

}