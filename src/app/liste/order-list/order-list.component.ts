import { Component, OnInit } from '@angular/core';
import { Order } from '../../interface/order.interface';
import { OrderService } from '../../order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = []

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe((res)=>{
      this.orders = res;
      console.log(res);
      
    })
   }

  ngOnInit(): void {
  }

}
