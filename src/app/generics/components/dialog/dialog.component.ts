import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../interface/product.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data : Product, 
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  confirm(id : number) {
    this.dialogRef.close({ data : id})
  }

  cancel() {
    this.dialogRef.close({ data: ''})
  }
} 
