import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../app/services/global.service';
import { MessageService } from 'primeng/api';
import { GamepadService } from 'ngx-gamepad';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit{
  boot = true;
  login = true;

  constructor(private globalService: GlobalService,  private messageService: MessageService, private gamepad: GamepadService){
    this.globalService.request.subscribe((res) => {
      if (res) {
        switch (res['type']) {
          case 'TOAST':
            this.showToast(res);
            break;
          case 'LOGIN':
            this.login = res['status']
            break;
          case 'CLOSE_SESION':
            this.boot = false;
            this.login = true;
              break;
          case 'LOCK_SESION':
            this.boot = false;
            this.login = true;
              break;
          case 'RESTAR':
            this.boot = res['status'];
            setTimeout(() => {
              this.boot = false;
            }, 8000);
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
    this.set_initial_setup();
    this.listenToGamepad();
  }

  async showToast(data) {
   
      let messageToast: any = {
        severity: data['severity'],
        summary: data['summary'],
        detail: data['detail'],
        life: 5000,
        sticky: data['sticky'] ? data['sticky'] : false
      };
      this.messageService.add(messageToast);
    
  }

  set_initial_setup() {
    let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    localStorage.setItem('theme', theme);
    this.globalService.switchTheme(theme);
  }

  listenToGamepad() {
    this.gamepad.connect().subscribe((data) => {
      //BUTTONS
        this.gamepad.on('button0').subscribe((data) => {
          if(document.querySelector('#button-0')){
            document.querySelector('#button-0').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-0').classList.toggle('active', false);  
              }, 100);
          }
          this.globalService.sendRequest({ type: 'GAMEPAD', buttonId: "button0" });
        });

        this.gamepad.on('button1').subscribe((data) => {
          if(document.querySelector('#button-1')){
            document.querySelector('#button-1').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-1').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button2').subscribe((data) => {
          if(document.querySelector('#button-2')){
            document.querySelector('#button-2').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-2').classList.toggle('active', false);  
              }, 100);
            }
        });

        this.gamepad.on('button3').subscribe((data) => {
          if(document.querySelector('#button-3')){
            document.querySelector('#button-3').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-3').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button4').subscribe((data) => {
          if(document.querySelector('#button-4')){
            document.querySelector('#button-4').classList.toggle('active', true);
          setTimeout(() => {
            document.querySelector('#button-4').classList.toggle('active', false);  
            }, 100);
          }
        });

        this.gamepad.on('button5').subscribe((data) => {
          if(document.querySelector('#button-5')){
            document.querySelector('#button-5').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-5').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button6').subscribe((data) => {
          if(document.querySelector('#button-6')){
            document.querySelector('#button-6').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-6').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button7').subscribe((data) => {
          if(document.querySelector('#button-7')){
            document.querySelector('#button-7').classList.toggle('active', true);
          setTimeout(() => {
            document.querySelector('#button-7').classList.toggle('active', false);  
            }, 100);
          }
        });

        this.gamepad.on('button8').subscribe((data) => {
          if(document.querySelector('#button-8')){
            document.querySelector('#button-8').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-8').classList.toggle('active', false);  
            }, 100);
          }
        });

        this.gamepad.on('button9').subscribe((data) => {
          if(document.querySelector('#button-9')){
            document.querySelector('#button-9').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-9').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button10').subscribe((data) => {
          if(document.querySelector('#button-10')){
            document.querySelector('#button-10').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-10').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button11').subscribe((data) => {
          if(document.querySelector('#button-11')){
            document.querySelector('#button-11').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-11').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button12').subscribe((data) => {
          if(document.querySelector('#button-12')){
            document.querySelector('#button-12').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-12').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button13').subscribe((data) => {
          if(document.querySelector('#button-13')){
            document.querySelector('#button-13').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-13').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button14').subscribe((data) => {
          if(document.querySelector('#button-14')){
            document.querySelector('#button-14').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-14').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('button15').subscribe((data) => {
          if(document.querySelector('#button-15')){
            document.querySelector('#button-15').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#button-15').classList.toggle('active', false);  
              }, 100);
          }
        });
        //JOYS 1

        this.gamepad.on('up0').subscribe((data) => {
          if(document.querySelector('#axe-0-up')){
            document.querySelector('#axe-0-up').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-0-up').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('down0').subscribe((data) => {
          if(document.querySelector('#axe-0-down')){
            document.querySelector('#axe-0-down').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-0-down').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('left0').subscribe((data) => {
          if(document.querySelector('#axe-0-left')){
            document.querySelector('#axe-0-left').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-0-left').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('right0').subscribe((data) => {
          if(document.querySelector('#axe-0-right')){
            document.querySelector('#axe-0-right').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-0-right').classList.toggle('active', false);  
              }, 100);
          }
        });

         //JOYS 2

         this.gamepad.on('up1').subscribe((data) => {
          if(document.querySelector('#axe-1-up')){
            document.querySelector('#axe-1-up').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-1-up').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('down1').subscribe((data) => {
          if(document.querySelector('#axe-1-down')){
            document.querySelector('#axe-1-down').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-1-down').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('left1').subscribe((data) => {
          if(document.querySelector('#axe-1-left')){
            document.querySelector('#axe-1-left').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-1-left').classList.toggle('active', false);  
              }, 100);
          }
        });

        this.gamepad.on('right1').subscribe((data) => {
          if(document.querySelector('#axe-1-right')){
            document.querySelector('#axe-1-right').classList.toggle('active', true);
            setTimeout(() => {
              document.querySelector('#axe-1-right').classList.toggle('active', false);  
              }, 100);
          }
        });
    })
  }
}
