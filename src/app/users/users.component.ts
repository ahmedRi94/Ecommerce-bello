import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user',
  template: `
  <div class="container my-5">
    <nav>
        <div class="nav nav-tabs justify-content-between" id="nav-tab" role="tablist">
          <button class="nav-link" id="nav-login" routerLinkActive="active" (click)="toShow = 'login'" [routerLink]="['/user','login']">Login</button>
          <button class="nav-link" id="nav-signup" routerLinkActive="active" (click)="toShow = 'signup'" [routerLink]="['/user','sign-up']">Sign Up</button>
        </div>
    </nav>
  </div>
  <div class="tab-content" id="nav-tabContent">
    <router-outlet></router-outlet>
</div>
  `
})
export class UserComponent implements OnInit {

toShow = 'login';

  constructor(private appService: AppService) {
 
   }

  ngOnInit(): void {
  }



}
