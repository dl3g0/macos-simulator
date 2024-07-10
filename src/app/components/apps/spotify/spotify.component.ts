import { Component, Output, input, output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.scss'
})
export class SpotifyComponent implements OnInit, OnDestroy{
  @Output() close = new EventEmitter<Object>();
  displaySpotify = true;
  songs = [
    { title: 'LUNA', artist: 'Feid y ATL Jacob', url: 'assets/music/LUNA.mp3' , image: 'assets/music-image/luna.jpg'},
    { title: 'MONACO', artist: 'Bad bunny', url: 'assets/music/MONACO.mp3' , image: 'assets/music-image/monaco.jpg'},
    // Agrega más canciones según sea necesario
  ];

  currentSongIndex = 0;
  isPlaying = false;
  audio = new Audio();
  volume = 1;
  currentTime = 0;
  backgroundColor = '#f8f8f8'; // Color de fondo por defecto
  displayDialog = false;
  constructor(private globalService: GlobalService) {
    this.audio.src = this.currentSong.url;
    this.audio.ontimeupdate = () => {
      this.currentTime = this.audio.currentTime;
    };

    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'SHOW_DIALOG':
            this.displayDialog = false;
            break;
          case 'VOLUMEN_SONG_OVERLAY':
            this.audio.volume = res['value'] / 100;
            console.log(res['value'])
            break;
          default:
            break;
        }
      }
    });
  }

  

  ngOnInit() {
    this.audio.volume = this.volume;
    this.globalService.sendRequest({ type: 'VOLUMEN_SONG', value: this.audio.volume });
  }

  ngOnDestroy(): void {
    this.pauseSong();
  }

  get currentSong() {
    return this.songs[this.currentSongIndex];
  }

  playSong() {
    this.audio.play();
    this.isPlaying = true;
    this.globalService.sendRequest({ type: 'CURRENT_SONG', value: this.currentSong });
    this.globalService.sendRequest({ type: 'PLAY_SONG' });
  }

  pauseSong() {
    this.audio.pause();
    this.isPlaying = false;
    this.globalService.sendRequest({ type: 'PAUSE_SONG' });
    this.globalService.sendRequest({ type: 'CURRENT_SONG', value: null });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  prevSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
    } else {
      this.currentSongIndex = this.songs.length - 1;
    }
    this.loadSong();
    this.playSong();
  }

  nextSong() {
    if (this.currentSongIndex < this.songs.length - 1) {
      this.currentSongIndex++;
    } else {
      this.currentSongIndex = 0;
    }
    this.loadSong();
    this.playSong();
  }

  loadSong() {
    this.audio.src = this.currentSong.url;
    this.audio.load();
    this.currentTime = 0;
    this.globalService.sendRequest({ type: 'LOAD_SONG' });
  }

  setVolume(event: any) {
    this.audio.volume = event.target.value;
    this.globalService.sendRequest({ type: 'VOLUMEN_SONG', value: this.audio.volume });
  }

  selectSong(index: number) {
    this.currentSongIndex = index;
    this.loadSong();
    this.playSong();
  }

  seek(event: any) {
    this.audio.currentTime = event.target.value;
  }

  formatTime(seconds: number) {
    const minutes: number = Math.floor(seconds / 60);
    const secondsPart: number = Math.floor(seconds % 60);
    return `${minutes}:${secondsPart < 10 ? '0' : ''}${secondsPart}`;
  }

  minimizeDialog(){
    this.displayDialog = true;
  }

  closeDialog(){
    this.close.emit()
  }
}
