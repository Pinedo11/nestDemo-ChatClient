import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/types/User.type';
import { UserService } from '../user/user.service';
import { MessageService } from './message.service';
import { Message } from './types/message.type';
import Socket = SocketIOClient.Socket;

@Component({
  moduleId: module.id,
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.css' ]
})
export class MessageComponent implements OnInit {

  messages:Message[] = [];
  @Input() messageInput:string;
  writing:string;
  actualUser:User;

  private socket:Socket;
  private timer;

  constructor (private messageService:MessageService,
               private route:ActivatedRoute,
               private userService:UserService) {
  }

  ngOnInit ():void {

    this.actualUser = this.userService.userConnected;
    console.log(this.route.params.toPromise().then((params) => params.json()));
    this.socket = this.messageService.connectSocket();
    this.socket.on('allMessages', (messages:Message[]) => {
      this.messages = messages;
    });
    this.socket.on('newMessage', (message:Message) => {
      this.messages.push(message);
    });
    this.socket.on('isWriting', (user:User) => {
      this.writing = user.name;
    });
    this.socket.on('isNotWriting', () => {
      this.writing = '';
    });

  }

  isWriting () {
    this.messageService.isWriting(this.actualUser);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  isNotWriting () {
    this.timer = setTimeout(() => {
      this.messageService.isNotWriting();
    }, 2000);
  }

  sendMessage () {
    this.messageService.sendMessage({ message: this.messageInput, user: this.actualUser });
    this.messageInput = '';
    this.messageService.isNotWriting();
  }

}
