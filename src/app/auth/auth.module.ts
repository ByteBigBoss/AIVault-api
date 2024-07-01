import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AngularMaterialModule,
    ]
})
export class AuthModule{

}