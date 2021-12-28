import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  toShow = "nav-cart"

  customerDataSend = false;

  temp: any

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, private orderService: OrderService) { 
   this.temp = this.orderService.customerDataChange.subscribe(() => {
      console.log('in order component')
      this.customerDataSend = this.orderService.customerDataSend;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.temp.unsubscribe();
  }

  changeView(view: string) {
    console.log('ciao da changeView')
    let elemt = [
      'nav-cart',
      'nav-checkout',
      'nav-complete'
    ]
    switch (view) {
      case 'next':
        if (this.toShow !== 'nav-complete') {
          let i = elemt.indexOf(this.toShow);
          if (elemt[i + 1] === 'nav-complete') {
            if (this.customerDataSend) {
              this.toShow = elemt[i + 1];
              this.orderService.postOrder().subscribe((res)=>{
                console.log(res)
              });
              this.router.navigate(['complete'], { relativeTo: this.route });
            }
          } else {
            if (this.appService.cart.length > 0)
              this.toShow = elemt[i + 1];
            this.router.navigate(['checkout'], { relativeTo: this.route });
          }
        }
        break;
      case 'back':
        if (this.toShow !== 'nav-cart') {
          let i = elemt.indexOf(this.toShow);
          this.toShow = elemt[i - 1];
          this.router.navigate(['carrello'], { relativeTo: this.route });
        }
        break;
      case 'nav-cart':
        this.toShow = 'nav-cart';
        this.router.navigate(['carrello'], { relativeTo: this.route });
        break;
      case 'nav-checkout':
        if (this.appService.cart.length > 0) {
          this.toShow = 'nav-checkout'
          this.router.navigate(['checkout'], { relativeTo: this.route });
        }
        break;
      case 'nav-complete':
        if (this.customerDataSend) {
          this.toShow = 'nav-complete'
          this.router.navigate(['complete'], { relativeTo: this.route });
        }
        break;
    }
  }
}