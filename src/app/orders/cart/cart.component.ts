import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/interface/product.interface';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalPrice = 0

  tmpArr: Product[] = []

  constructor(private appService: AppService, private orderService : OrderService) {
    this.tmpArr = this.appService.cart;
    this.orderService.productsConfirmed = this.tmpArr;
  }

  ngOnInit(): void {
    if(this.tmpArr)
      this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice = (): number => {
    let price: number = 0;

    const priceProducts: any[] = this.tmpArr.map(product => {
      if (product.onSales === false) {       
         return product.price * product.quantity;
      }
      else {     // se il prodotto è in offerta calcola il relativo prezzo
         return (product.price - (product.price * product.discount / 100)) * product.quantity;
      }
    });
    
    priceProducts.forEach(pricePd => price += pricePd);
    console.log(price);
    return price
  }

  addProduct = (index: number): number => {
    this.tmpArr[index].quantity++;
    this.orderService.productsConfirmed = this.tmpArr;
    this.totalPrice = this.getTotalPrice();
    return this.tmpArr[index].quantity;
  };

  decProduct = (index: number) => {
      if(this.tmpArr[index].quantity === 1){
       this.tmpArr.splice(index, 1);
       this.orderService.productsConfirmed = this.tmpArr;
       this.totalPrice = this.getTotalPrice();
       return null;
      }
      this.tmpArr[index].quantity--
      this.orderService.productsConfirmed = this.tmpArr;
      this.totalPrice = this.getTotalPrice();
      return this.tmpArr[index].quantity
  };

}
