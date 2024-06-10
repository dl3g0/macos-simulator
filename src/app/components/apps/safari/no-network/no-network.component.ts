import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GamepadService } from 'ngx-gamepad';
import { GlobalService } from '../../../../services/global.service';
@Component({
  selector: 'app-no-network',
  templateUrl: './no-network.component.html',
  styleUrls: ['./no-network.component.scss']
})
export class NoNetworkComponent implements OnInit, AfterViewInit{
  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D; // Definición para el contexto del canvas

  scoreInterval: number = 0;
  frameInterval: number = 0;
  groundscroll: number = 0;
  groundscroll2: number = 0;
  tempstart: number = 0;
  groundbool: boolean = false;
  frame: number = 0;
  grav: number = 0.6;
  bool: boolean = false;
  gamespeed: number = 0;

  multiS: number = -1;
  picS: number = 0;
  multiB: number = -1;
  picB: number = 0;

  obsS = {
    x: 20,
    y: 230,
    w: 34,
    h: 70,
    scroll: -100,
    on: false
  };

  obsB = {
    x: 20,
    y: 201,
    w: 49,
    h: 100,
    scroll: -200,
    on: false
  };

  p = {
    x: 100,
    y: 500,
    w: 89,
    h: 94,
    yv: 0,
    score: 0,
    hscore: 0,
    jump: 15
  };

  pbox = {
    x: this.p.x,
    y: 0,
    w: 80,
    h: 75
  };

  plat = null

  onG: boolean = false;
  sprImg = new Image();

  constructor(private gamepad: GamepadService, private globalService: GlobalService){
    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'GAMEPAD':
            this.keyDown(res['buttonId'])
            break;
          default:
            break;
        }
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.canvas)
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      this.plat = ({
        x: 0,
        y: this.canvas.nativeElement.height - 100,
        w: this.canvas.nativeElement.width,
        h: 5,
      })
      setInterval(() => this.update(), 1000 / 60);
      document.addEventListener("keydown", (evt) => this.keyDown(evt));
      this.sprImg.src = "assets/sprites/sprite.png";
    }
    
  }

  update(): void {
    if (!this.onG) {
      this.p.yv += this.grav;
    }

    this.p.y += this.p.yv;
    this.pbox.y = this.p.y;
    this.scoreInterval++;

    if (this.scoreInterval > 6 && this.gamespeed != 0) {
      this.p.score++;
      this.scoreInterval = 0;
    }

    if (this.gamespeed < 17 && this.gamespeed != 0) {
      this.gamespeed = 7 + (this.p.score / 100);
    }

    this.onG = false;

    if (this.p.y + this.p.h > this.plat.y) {
      this.p.y = this.plat.y - this.p.h;
      this.onG = true;
    }

    if (this.pbox.x > (this.canvas.nativeElement.width - this.obsB.scroll) - this.p.w &&
        this.pbox.x < (this.canvas.nativeElement.width - this.obsB.scroll) + (this.obsB.w * this.multiB) &&
        this.pbox.y > this.obsB.y - this.pbox.h) {
      this.gameover();
    }

    if (this.pbox.x > (this.canvas.nativeElement.width - this.obsS.scroll) - this.p.w &&
        this.pbox.x < (this.canvas.nativeElement.width - this.obsS.scroll) + (this.obsS.w * this.multiS) &&
        this.pbox.y > this.obsS.y - this.pbox.h) {
      this.gameover();
    }

    this.frameInterval++;

    if (this.frameInterval > 5) {
      this.bool = !this.bool;
      this.frameInterval = 0;
    }

    if (this.bool && this.onG) {
      this.frame = 1514;
    } else if (!this.bool && this.onG) {
      this.frame = 1602;
    } else {
      this.frame = 1338;
    }

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.groundscroll += this.gamespeed;
    this.ctx.drawImage(this.sprImg, 0, 104, 2404, 18, 0 - this.groundscroll + this.tempstart, this.plat.y - 24, 2404, 18);

    if (this.groundscroll - this.tempstart > 2404 - this.canvas.nativeElement.width || this.groundbool) {
      this.groundbool = true;
      this.groundscroll2 += this.gamespeed;
      this.ctx.drawImage(this.sprImg, 0, 104, this.canvas.nativeElement.width, 18, 0 - this.groundscroll2 + this.canvas.nativeElement.width, this.plat.y - 24, this.canvas.nativeElement.width, 18);

      if (this.groundscroll2 > this.canvas.nativeElement.width && this.groundscroll - this.tempstart > 1000) {
        this.tempstart = this.canvas.nativeElement.width;
        this.groundscroll = 20;
      }

      if (this.groundscroll2 > 2402) {
        this.groundscroll2 = 0;
        this.groundbool = false;
      }
    }

    if (this.gamespeed != 0) {
      this.ctx.fillStyle = "black";
      this.ctx.drawImage(this.sprImg, this.frame, 0, 88, 94, this.p.x, this.p.y, this.p.w, this.p.h);
    } else {
      this.ctx.drawImage(this.sprImg, 1338, 0, 88, 94, this.p.x, this.p.y, this.p.w, this.p.h);
    }

    if (!this.obsB.on) {
      this.obsS.on = true;

      if (this.multiS == -1) {
        this.rngS();
      }

      this.ctx.drawImage(this.sprImg, this.picS, 2, this.obsS.w * this.multiS, this.obsS.h,
        this.canvas.nativeElement.width - this.obsS.scroll, this.obsS.y, this.obsS.w * this.multiS, this.obsS.h);

      this.obsS.scroll += this.gamespeed;

      if (this.obsS.scroll > this.canvas.nativeElement.width + this.obsS.w * 3) {
        this.obsS.scroll = -100;
        this.multiS = -1;
        this.obsS.on = false;
      }
    }

    if (!this.obsS.on) {
      this.obsB.on = true;

      if (this.multiB == -1) {
        this.rngB();
      }

      this.ctx.drawImage(this.sprImg, 652, 2, this.obsB.w * this.multiB, this.obsB.h,
        this.canvas.nativeElement.width - this.obsB.scroll, this.obsB.y, this.obsB.w * this.multiB, this.obsB.h);

      this.obsB.scroll += this.gamespeed;

      if (this.obsB.scroll > this.canvas.nativeElement.width + this.obsB.w * 3) {
        this.obsB.scroll = -200;
        this.multiB = -1;
        this.obsB.on = false;
      }
    }

    this.ctx.font = '20px verdana';
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Puntuación: ", 30, this.canvas.nativeElement.height - 40);
    this.ctx.fillText(this.p.score.toString(), 170, this.canvas.nativeElement.height - 40);
    this.ctx.fillText("Mejor puntuación: ", 510, this.canvas.nativeElement.height - 40);
    this.ctx.fillText(this.p.hscore.toString(), 715, this.canvas.nativeElement.height - 40);
  }

  gameover(): void {
    this.gamespeed = 0;
    console.log("HIT!");

    if (this.p.score > this.p.hscore) {
      this.p.hscore = this.p.score;
    }

    this.p.score = 0;
    this.obsB.scroll = -200;
    this.obsS.scroll = -100;

    this.scoreInterval = 0;
    this.frameInterval = 0;
    this.groundscroll = 0;
    this.groundscroll2 = 0;
    this.tempstart = 0;
    this.groundbool = false;
    this.multiS = -1;
    this.multiB = -1;
  }

  keyDown(evt): void {
    if (evt.keyCode == 32 ) {
      if (this.onG) {
        this.p.yv = -this.p.jump;
      }
      
      if (this.gamespeed == 0) {
        this.gamespeed = 7;
      }
    }
    if (evt == 'button0' ) {
      if (this.onG) {
        this.p.yv = -this.p.jump;
      }
      
      if (this.gamespeed == 0) {
        this.gamespeed = 7;
      }
    }
  }

  rngS(): void {
    this.multiS = Math.floor(Math.random() * 3) + 1;
    this.picS = 446 + (Math.floor(Math.random() * 2) * 102);
  }

  rngB(): void {
    this.multiB = Math.floor(Math.random() * 3) + 1;
    this.picB = 652 + (Math.floor(Math.random() * 2) * 150);
  }
}
