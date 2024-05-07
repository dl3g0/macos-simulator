import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../app/services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  boot = false;
  login = true;

  constructor(private globalService: GlobalService){
    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
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
}
