import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[] = []

  email: string;
  password: string;

  constructor(private appService: AppService, private router: Router) {
    this.appService.getUsers().subscribe((res)=>{
      this.users = res;
      console.log(this.users)
    })
   }

  ngOnInit(): void {
  }

  checkUser(){
    console.log('checkuser called');

    let logginUser = this.users.find(user => (user.email === this.email) && (user.password === this.password));
    console.log(logginUser);
    
    if(logginUser) {
      console.log('trovato');
      console.log(logginUser.role);
      this.appService.changeUserRole(logginUser.role);
      this.router.navigate(['/']);
    } else {
      console.log('non lo trovo');
      this.appService.userRole = null;
    }
  }

}
