import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.scss'
})
export class NotifyComponent implements OnInit, OnDestroy{
  notifications: Notification[] = [];
  subscriber: Subscription;
  constructor(
    private globalService: GlobalService
  ) {
    this.subscriber = this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'NOTIFY_SYSTEM':
            this.addNotification(res);
            break;
          default:
            break;
        }
      }
    });
  }

  private addNotification(notification) {
    this.notifications.push(notification);
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  close(notification) {
    let element = document.getElementById(`${notification.id}`);
     if(element){
      element.classList.remove("animate__bounceInRight");
      element.classList.remove("animate__animated");
      element.classList.add("animate__animated");
      element.classList.add("animate__bounceOutRight");
     }
    setTimeout(() => {
     this.notifications = this.notifications.filter((notif:any) => notif.id !== notification.id); 
    }, 1000);
  }
}
