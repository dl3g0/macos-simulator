import { Component, Output, input, output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.scss'
})
export class SpotifyComponent {
  @Output() close = new EventEmitter<Object>();
  displaySpotify = true;

  closeDialog(){
    this.close.emit()
  }
}
