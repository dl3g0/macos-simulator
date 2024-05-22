import { Component, Output, input, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vs-code',
  templateUrl: './vs-code.component.html',
  styleUrl: './vs-code.component.scss'
})
export class VsCodeComponent {
  displayVscode = true;
  @Output() close = new EventEmitter<Object>();

  closeDialog(){
    this.close.emit()
  }
}
