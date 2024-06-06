import { Component, Output, input, output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  displayTerminal = true;
  index = 0;
  
  @Output() close = new EventEmitter<Object>();

  closeDialog(){
    this.close.emit()
  }
}
