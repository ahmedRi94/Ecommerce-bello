import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/generics/components/dialog/dialog.component';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private appService: AppService, private dialog: MatDialog) {
    this.appService.getProducts().subscribe(data => {
      this.products = data;
    })
   }

  ngOnInit(): void {
  }

  openDialog(p : Product) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: p
    })
    //console.log(p);
    
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        //console.log(res);
        if (res.data) {
          this.deleteProduct(res.data);
        }
      }    
    })
  }

  deleteProduct(id: number){
    let index = this.products.indexOf(this.products.find(p => p.id === id));

    this.appService.deleteProduct(id).subscribe((res)=>{
      //console.log('prima' + this.products);
      
      this.products.splice(index, 1);

      //console.log('dopo' + this.products);
      
      //console.log(res);
    })
  }

}
