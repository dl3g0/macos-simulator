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
      avatar:
        'assets/images/yyjmmpy5briulcfqfbas.webp',
      name: 'Diego Alonso Jaramillo Faustino',
      password: '123456',
    },
    {
      avatar:
        'assets/images/profile-picture.webp',
      name: 'Daniel Carhuas Carranza',
      password: '1234567',
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
    if (this.password === this.selectedUser.password) {
      this.globalService.sendRequest({ type: 'LOGIN', status: false });
      this.statusPass = false;
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
      this.statusPass = true;
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
