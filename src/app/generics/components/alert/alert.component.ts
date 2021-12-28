import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() alertMessage:string;
  @Input() alertClass:string;

  constructor() { }

  ngOnInit(): void {
  }

}
