import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  role: 'user'|'admin'|null = null
  cartLength: Number;

  constructor(private appService: AppService, private orderService: OrderService) {
    let temp = this.appService.userRoleChange.subscribe(() => {
      this.role = this.appService.userRole;
    })
    this.appService.cartLengthChange.subscribe(() => {
      this.cartLength = this.appService.cartLength;
    })
   }

   logOut(){
     this.appService.changeUserRole(null);
     this.appService.cart = [];
     this.appService.changeCartLength();
   }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges){
    console.log(change)
  }
}
