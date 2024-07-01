import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'ascaorigin-ms';

  constructor(private authService:AuthService){
    console.log("first load")
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

}
