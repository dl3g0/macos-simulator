import { Component, Output, input, output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-safari',
  templateUrl: './safari.component.html',
  styleUrl: './safari.component.scss'
})
export class SafariComponent {
  @Output() close = new EventEmitter<Object>();
  displaySafari = true;
  wifiOn = true;

  constructor(private globalService: GlobalService){
    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'STATUS_WIFI':
            this.wifiOn = res['status'];
            break;
          default:
            break;
        }
      }
    });
  }

  closeDialog(){
    this.close.emit()
  }
}
