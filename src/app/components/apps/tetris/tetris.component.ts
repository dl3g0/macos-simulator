import { Component, Output, input, output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss'
})
export class TetrisComponent {
  displayTetris = true;
  @Output() close = new EventEmitter<Object>();

  closeDialog(){
    this.close.emit()
  }
}
