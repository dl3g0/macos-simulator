import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  listUser = [
    {
      avatar:'assets/images/yyjmmpy5briulcfqfbas.webp',
      name: 'Jaramillo Faustino, Diego Alonso',
      password: '123456',
    },
    {
      avatar:'assets/images/profile-picture.webp',
      name: 'Carhuas Carranza Daniel Angel',
      password: '1234567',
    },
    {
      avatar:'https://cdn.wallpapersafari.com/38/11/2WqNdH.jpg',
      name: 'Chelqquetuma Gutierrez Angel'
    },

  ];

  selectedUser = null;
  password = '';

  menubarItems = [];
  statusPass = false;
  constructor(private globalService: GlobalService) {
    this.globalService.request.subscribe((res) => {
      if (res) {
        console.log(res)
        switch (res['type']) {
          case 'LOCK_SESION':
            this.selectedUser = res['user'];
            break;
          case 'CLOSE_SESION':
            this.selectedUser = res['user'];
            break;
        }
      }
    });
  }

  login() {
    if(this.selectedUser.password){
      if (this.password === this.selectedUser.password) {
        this.globalService.sendRequest({ type: 'LOGIN', status: false });
        localStorage.setItem('user', JSON.stringify(this.selectedUser));
      } else {
        this.globalService.sendRequest({
          id: uuid.v4(),
          app: 'SYSTEM',
          title: 'Sistema',
          subTitle: 'Error en contraseña',
          date: new Date(),
          timeout: 0,
          type: 'NOTIFY_SYSTEM',
        });
      }
    }else{
      this.globalService.sendRequest({ type: 'LOGIN', status: false });
      localStorage.setItem('user', JSON.stringify(this.selectedUser));
    }
  }

  clickTurnOff() {
    this.globalService.sendRequest({ type: 'TURN_OFF', status: true });
  }

  clickRestar() {
    this.globalService.sendRequest({ type: 'RESTAR', status: true });
  }

  clickSuspend() {
    this.globalService.sendRequest({ type: 'SUSPEND', status: true });
  }
}
