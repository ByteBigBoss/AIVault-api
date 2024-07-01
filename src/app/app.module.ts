import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AluthInterceptor } from './auth/auth-interceptor';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './post/posts.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AngularMaterialModule,
    PostsModule,
    AuthModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AluthInterceptor ,multi:true}, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
