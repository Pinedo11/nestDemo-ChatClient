import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';
import { Constants } from '../shared/constants';
import { User } from '../user/types/User.type';
import { Message } from './types/message.type';

import Socket = SocketIOClient.Socket;

@Injectable()
export class MessageService {


  private socket:Socket;

  constructor (private _http:Http) {}

  connectSocket ():Socket {
    this.socket = io(`http://${Constants.IP}:${Constants.SOCKET_SERVER_PORT}/messages`);
    return this.socket;
  }

  isWriting (user:User) {
    this.socket.emit('isWriting', user);
  }

  isNotWriting () {
    this.socket.emit('isNotWriting');
  }

  sendMessage (message:Message) {
    this.socket.emit('data', message);
  }


}
