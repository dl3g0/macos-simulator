import { Component, Output, input, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-safari',
  templateUrl: './safari.component.html',
  styleUrl: './safari.component.scss'
})
export class SafariComponent {
  @Output() close = new EventEmitter<Object>();
  displaySafari = true;

  closeDialog(){
    this.close.emit()
  }
}
