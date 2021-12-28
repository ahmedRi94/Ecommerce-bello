import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../interface/product.interface';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  filterString: string = '';
  products: Product[] = [];
  brands: string[] = [];
  types: string[] = [];
  selectedType: any = 'Any';
  selectedBrand: any = 'Any';

  role: 'user'|'admin'|null = null;

temp: any;

  constructor(private appService: AppService) {

    // setta role in base all'userRole attuale di appService
    this.role = this.appService.userRole;
    console.log('init role ' + this.role);

    // controlla cambiamenti del role
   this.temp = this.appService.userRoleChange.subscribe(() => {
      
      console.log('userRole ' + this.appService.userRole);
      
      this.role = this.appService.userRole;

      console.log('role ' + this.role);

    })
   
    let prodotti = this.appService.getProducts();
    prodotti.subscribe(data => {
      this.products = data;
      data.forEach(element => {
        if(!(this.brands.includes(element.brand))){
          this.brands.push(element.brand)
        }
        if(!(this.types.includes(element.type))){
          this.types.push(element.type)
        }
      });
    })

    
  }
 
  //da spostare in un ipotetico cart service

  addCartElement(e: number){
    let element;
    element = this.appService.cart.find(element => element.id === e);
    if(element){
      element.quantity++
    } else {
      element = this.products.find(element => element.id === e);
      element.quantity = 1;
      this.appService.cart.push(element);
      this.appService.changeCartLength();
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.temp.unsubscribe();
  }
}
