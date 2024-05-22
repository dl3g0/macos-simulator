import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import * as uuid from 'uuid';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  listUser = [
    {
      avatar: "https://res.cloudinary.com/ddjzuyfns/image/upload/v1714616571/yyjmmpy5briulcfqfbas.jpg",
      name: "Diego Alonso Jaramillo Faustino",
      password: "123456"
    },
    {
      avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      name: "Daniel Carguas",
      password: "1234567"
    },
    {
      avatar: "https://www.shutterstock.com/image-photo/woman-face-profile-side-view-600nw-1937688637.jpg",
      name: "Estefany",
      password: "12345678"
    }
  ];
 
  selectedUser = null;
  password = "";

  menubarItems = [];
  constructor(private globalService: GlobalService){

  }

  login(){
    if(this.password === this.selectedUser.password){
      this.globalService.sendRequest({ type: 'LOGIN', status: false });
    }else{
      // this.globalService.sendRequest({ severity: 'error', summary: 'Error', detail: "Contraseña incorrecta", type: 'TOAST', });

        this.globalService.sendRequest({ 
        id: uuid.v4(), 
        app: "SYSTEM",
        title: "Sistema",
        subTitle: "Error en contraseña",
        date: new Date(),
        timeout: 0,
        type: 'NOTIFY_SYSTEM'});
    }
  }
}
