import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() prodotto: Product;

  @Output() addCartEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    this.addCartEvent.emit(this.prodotto.id);
  }


}
