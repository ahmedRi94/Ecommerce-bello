import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Message } from '../../interface/message.interface';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = []

  constructor(private appService: AppService) {
    this.appService.getMessages().subscribe((res)=>{
      this.messages = res;
    })
   }

  ngOnInit(): void {
  }

}
