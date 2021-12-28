import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  inviati: boolean = false;

  name:string;
  surname:string;
  email:string;
  address:string;
  country:string;
  city:string;
  cap:number;
  paymentMethod:string;
  
  constructor(private orderService: OrderService) {
  }

  customerSendData(data){
    console.log(data);
    this.orderService.dataCustomer = data.form.value;
    this.orderService.changeCustomerData(true);
    this.inviati = true
  }

  ngOnInit(): void {
  }

}
