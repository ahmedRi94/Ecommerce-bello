import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { Product } from 'src/app/interface/product.interface';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  data = new Date()

  cart: Product[]= []

  nArticoli: number;

  prezzo: number;

  prezzoTot: number;

  customer: Customer;

  codice = Math.floor((Math.random()*9999)+1);

  constructor(private orderService: OrderService) {
    this.data.setDate(this.data.getDate() + 7)
   }

  ngOnInit(): void {
    let temp
    this.cart = this.orderService.productsConfirmed;
    this.customer = this.orderService.dataCustomer;
    this.nArticoli = this.cart.map((elem) => elem.quantity).reduce((acc, cur)=> acc+cur);
    this.prezzo = this.cart.map((elem) => elem.price).reduce((acc, cur)=> acc+cur);
    this.prezzoTot = this.cart.map((elem) => elem.price*elem.quantity).reduce((acc, cur)=> acc+cur);
  }

}

