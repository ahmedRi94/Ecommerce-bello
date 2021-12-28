import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {

  products: Product[];
  brands: string[] = [];
  types: string[] = [];
  selectedType: any = 'Any';
  selectedBrand: any = 'Any';
  filterString: string = '';

  temp: any;

  role: 'user'|'admin'|null = null;

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
      //console.log(data);
      this.products = data.filter((element) => element.onSales === true)
      //console.log(this.products);
      data.forEach(element => {
        if(!(this.brands.includes(element.brand))){
          this.brands.push(element.brand)
        }
        if(!(this.types.includes(element.type))){
          this.types.push(element.type)
        }
      });
    });
  }

  ngOnInit(): void {
  }

ngOnDestroy(){
  this.temp.unsubscribe();
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
}
