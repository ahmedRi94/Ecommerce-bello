import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { Customer } from './interface/customer.interface';
import { Order } from './interface/order.interface';
import { Product } from './interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'https://60e7113c15387c00173e4a54.mockapi.io/';

  productsConfirmed: Product[] = [];
  
  dataCustomer : Customer;

  canRoute = false

  customerDataChange: Subject<boolean> = new Subject<boolean>()

  customerDataSend = false;

  constructor(private http: HttpClient) { 
    this.customerDataChange.subscribe((value)=>{
      this.customerDataSend = value;
    })
  }


  changeCustomerData(check: boolean) {
    this.customerDataChange.next(check)
  }

  isAuthenticated(route: ActivatedRouteSnapshot) {
    this.canRoute = false;
    console.log(route.routeConfig.path)
    switch (route.routeConfig.path) {
      case 'checkout':
        if (this.productsConfirmed.length) {
          this.canRoute = true;
        }
        break;    
      case 'complete':
        if (this.customerDataSend) {
          this.canRoute = true;
        }
        break;
      case 'carrello':
          this.canRoute = true;
        break;
    }
    return this.canRoute;
  }

  getOrders(){
    return this.http.get<Order[]>(this.url + 'orders/');
  }

  postOrder(){
    let order = {
      products: this.productsConfirmed,
      customer: this.dataCustomer
    }
    return this.http.post<Order>(this.url + 'orders/', order);
  }
}
