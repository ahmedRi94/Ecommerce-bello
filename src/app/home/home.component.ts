import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../interface/product.interface';
import { Slide } from '../interface/slide.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  slides: Slide[] = [
    {
      title: 'ZUPERMART',
      description: 'Uno dei migliori siti di vendita di prodotti tech',
      img: 'https://datarespons.solutions/wp-content/uploads/hi-tech-industr-scandinavia-bg.jpg'
    }, {
      title: 'Accessori PS5',
      description: 'Dualsense Ps5, Cuffie da Gaming',
      img: 'https://gamespecialist.co/wp-content/uploads/2021/02/bannerps5-1.jpg'
    }, {
      title: 'Notebook HP ZBOOK CREATE',
      description: 'IL NUOVO STANDARD PER I PROFESSIONISTI DELLA TECNICA E DELLA CREATIVITÀ',
      img: 'https://store.hp.com/UkStore/Html/Merch/Banners/Hero_image-DESKTOP_5f0d7512f0210.png'
    }, {
      title: 'Iphone11,11Pro e Max',
      description: "il pù potente Iphone",
      img: 'https://www.bechtle.com/dam/jcr:be14f920-9691-435d-a394-77cb1fa093e5/cw37_stage1_apple-iphone11-eu.jpg'
    }, {
      title: 'Ultrabook Lenovo ThinkPad T.',
      description: 'Il simbolo del business ultra-mobile.',
      img: 'https://www.bechtle.com/dam/jcr:b707a872-536b-4b95-8004-46b5e8d7be72/cw31_stage1_lenovo.jpg'
    }, {
      title: 'Scheda Madre MSI',
      description: 'Scheda Madre da Gaming',
      img: 'https://cdn.shopify.com/s/files/1/2173/4373/files/MSI_Z490_Banner_1920x.jpg?v=1606876819'
    },
  ]

  prodotti: Product[]=[];

  index = 0;
  interval: any;
  isActive = false;
  elCurrent = 0;

  carouselId = "hpSlider";

  constructor(private appService: AppService) {
    this.appService.getProducts().subscribe((res) => {
      this.prodotti = res.splice(0, 4);
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
