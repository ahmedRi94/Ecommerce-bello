import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chisiamo',
  templateUrl: './chisiamo.component.html',
  styleUrls: ['./chisiamo.component.scss']
})
export class ChisiamoComponent implements OnInit {

  motivazioni=[
    { span:"1",
      titolo:"Consegna sicura",
      descrizione:"La consegna avviene in tutta Italia tramite un servizio di tracciamento messo a disposizione del cliente,dopo aver effettuato l'acquisto."},
    { span:"2",
     titolo:"Pagamento sicuro",
     descrizione:"Il pagamento online avviene in maniera totalmente sicura e senza alcun tipo di fregatura.Inoltre accettiamo tutte le carte di credito e paypal."},
    { span:"3",
     titolo:"Garanzia e sicurezza",
     descrizione:"Ogni prodotto da noi venduto dispone di una resa in caso di danno dovuto alla consegna e una garanzia minima di due anni."}
  ]

  immagini=[
    {imgsrc:"https://www.logo.wine/a/logo/Dell/Dell-Logo.wine.svg"},

    {imgsrc:"https://images3.alphacoders.com/807/thumb-1920-807602.jpg"},

    {imgsrc:"https://1000marche.net/wp-content/uploads/2020/03/Apple-logo-768x432.png"},

    {imgsrc:"https://www.futurasrl.it/wp-content/uploads/2014/10/playstation-logo.png"},

    {imgsrc:"https://multiplayer.net-cdn.it/thumbs/images/2019/11/08/asus-logo_jpg_800x0_crop_upscale_q85.jpg"},

    {imgsrc:"http://www.tradeco.computer/wp-content/uploads/2015/06/asus-rog-logo.png"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
