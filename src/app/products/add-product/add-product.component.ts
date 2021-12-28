import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  name: string = "";
  brand: string = "";
  imgUrl: string = "";
  img: string[] = [];
  id: number = 0;
  type: string = "";
  description: string = "";
  quantity: number = 0;
  price: number = 0;
  onSales: boolean;
  discount: number = 0;
  isEnabled: boolean;

  counterId: number = 0;
  imgDefault = "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile.png";

  editProduct: Product = null;

  editMode = false;

  @ViewChild("errorStamp") error: ElementRef;
  httpClient: any;
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getProducts().subscribe((res) => {
      this.counterId = res.length;
      this.route.params.subscribe((params) => {
        if(params.id){
          this.editMode = true;
          this.editProduct = res.find((elem) => elem.id === params.id);
          this.name = this.editProduct.name;
          this.brand =  this.editProduct.brand;
          this.img = this.editProduct.img;
          this.imgUrl = this.editProduct.img[1];
          this.id = this.editProduct.id;
          this.type = this.editProduct.type;
          this.description = this.editProduct.description;
          this.quantity = this.editProduct.quantity;
          this.price = this.editProduct.price;
          this.onSales = this.editProduct.onSales;
          this.discount = this.editProduct.discount;
        }
      })
    })
  }

  changeDisabled(event) {
    const value = event.target.value;
    if (value === 'true') {
      this.isEnabled = false;
    } else {
      this.isEnabled = true;
    }
  }
  controlUrlImg(link: string) {
    if (link.startsWith("https://")) {
      return true;
    } else {
      return false;
    }
  }

  addImages() {
    if (!this.controlUrlImg(this.imgUrl)) {
      this.error.nativeElement.style = "height:4%";
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Inserisci bene il link";
    } else {
      if (this.img.length<1) {
        this.img.unshift(this.imgDefault);
      }
      this.img.push(this.imgUrl);
      console.log(this.img);
      this.imgUrl = "";
      this.error.nativeElement.style = "background : green ;height:4%";
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Immagine inserita con successo";
    }
  }

  deletImmage(i: number) {
    this.img.splice(i, 1);
  }

  addProduct() {
    if (this.name === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo nome prodotto obbligatorio";
    } else if (this.brand === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo marca prodotto obbligatorio";
    } else if (this.type === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo categoria obbligatorio, selezionare la categoria giusta";
      this.error.nativeElement.style = "height:7%";
    } else if (this.quantity === 0) {
      this.error.nativeElement.style = "height:4%";
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo quantità prodotto obbligatorio";
    } else if (this.price === 0) {
      console.log(this.price);
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo prezzo prodotto obbligatorio";
    } else if (this.isEnabled === false && this.discount === 0) {
      console.log(this.isEnabled);
      this.error.nativeElement.style = "height:7%";
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo percentuale offerta obbligatorio, altrimenti seleziona che non è in offerta!!";
    } else if (this.description === "") {
      this.error.nativeElement.style = "height:4%";
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo Descrizione prodotto obbligatorio";
    } else {
      this.counterId++;
      let obj: Product;
      if (this.img.length === 0) {
        this.img.push(this.imgDefault);
      }
      obj = {
        name: this.name,
        brand: this.brand,
        img: this.img,
        id: this.counterId,
        type: this.type,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        onSales: !this.isEnabled,
        discount: this.discount
      }
      try {
        if(this.editMode){
          obj.id = this.editProduct.id; 
          this.appService.putProduct(obj).subscribe((res) => {
            this.error.nativeElement.classList.add("error");
            this.error.nativeElement.innerHTML = "Prodotto Modificato";
            this.error.nativeElement.style = "background : green; height:4%";
          })
        } else {
          this.appService.addProduct(obj).subscribe((res) => {
            this.error.nativeElement.classList.add("error");
            this.error.nativeElement.innerHTML = "Grazie per aver aggiunto il prodotto!!!";
            this.error.nativeElement.style = "background : green; height:4%";
          });
        }
        if(!this.editMode){
          this.name="";
          this.brand="";
          this.img=[];
          this.imgUrl = "";
          this.type="";
          this.description="";
          this.quantity=0;
          this.price=0;
          this.onSales=false,
          this.discount=0;
        }
        setTimeout(() => {
          this.router.navigate(['../negozio'], { relativeTo: this.route });
        }, 4000);
      } catch (error) {
        this.error.nativeElement.classList.add("error");
        this.error.nativeElement.innerHTML = "Errore tecnico!!! Si prega di riprovare più tardi.<br> Grazie" + this.name;
        this.error.nativeElement.style = "height:9%";
        console.log(error);
      }
    }
  }

}
