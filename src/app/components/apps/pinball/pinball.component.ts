import { Component, Output, input, output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-pinball',
  templateUrl: './pinball.component.html',
  styleUrl: './pinball.component.scss'
})
export class PinballComponent {
  @Output() close = new EventEmitter<Object>();
  displayPinball = true;

  closeDialog(){
    this.close.emit()
  }
}
