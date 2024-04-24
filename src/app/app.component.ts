import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  boot = true;
  login = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.boot = false;
    }, 8000);
  }
}
