import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/order.service';
import { AppService } from '../../app.service';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id: number;
  product: Product;
  imgShow: string;
  onClick: boolean = false;

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.appService.getProduct(this.id).subscribe((res) => {
        this.product = res;
        if (this.product.img.length > 1) {
          this.imgShow = this.product.img[1];
        }
      })
    });
  }

  changeImg(img: string) {
    this.imgShow = img;
  }
  like(event) {
    if (!this.onClick) {
      // event.target.classList.add('checked-heart');
      event.target.style="color:red";
      this.onClick = true;      
    } else {
      // event.target.classList.remove('checked-heart');
      event.target.style="color:black";
      this.onClick = false;
    }
  }

  addCartElement(e: number){
    let element;
    element = this.appService.cart.find(element => element.id === e);
    if(element){
      element.quantity++
    } else {
      element = this.product;
      element.quantity = 1;
      this.appService.cart.push(element);
      this.appService.changeCartLength();
    }
  }

}
