import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../app/services/global.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit{
  boot = true;
  login = true;

  constructor(private globalService: GlobalService,  private messageService: MessageService){
    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'TOAST':
            this.showToast(res);
            break;
          case 'LOGIN':
            this.login = res['status']
            break;
          default:
            break;
        }
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.boot = false;
    }, 8000);
  }

  async showToast(data) {
   
      let messageToast: any = {
        severity: data['severity'],
        summary: data['summary'],
        detail: data['detail'],
        life: 5000,
        sticky: data['sticky'] ? data['sticky'] : false
      };
      this.messageService.add(messageToast);
    
  }
}
