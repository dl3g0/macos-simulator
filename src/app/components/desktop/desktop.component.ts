import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  Renderer2,
  ElementRef
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
  providers: [MessageService, TerminalService],
})
export class DesktopComponent implements OnInit, OnDestroy{
  @ViewChild('menu') menu: any;

  themeStatus = false;

  displayTerminal: boolean | undefined;

  displayFinder: boolean | undefined;

  displayGalleria: boolean | undefined;

  dockItems: MenuItem[] | undefined;

  menubarItems: any[] | undefined;

  responsiveOptions: any[] | undefined;

  images: any[] | undefined;

  nodes: any[] | undefined;

  subscription: Subscription | undefined;

  displaySpotify = true;
  boot = true;
  wifiOn = false;
  bluetoothOn = false;
  airdropOn = false;
  valueScreen = 99;
  valueSound = 50;
  login = true;
  focusingOn = false;

  itemsMenuAntiClick = [
    {
      label: 'Nueva carpeta',
      command: () => {
        this.createFolder();
      }
    },
    {
      label: 'Vaciar papelera'
    },
    {
      label: 'Cambiar fondo de escritorio'
    },
    {
      label: 'Administrador de tareas',
      command: () => {
        this.displayTask = true;
      }
    }
  ];
  menuLeft: number = 0;
  menuTop: number = 0;
  displaySafari = false;
  displayVscode = false;

  displayTask = false;
  listMusic = [
    {
      url: "assets/music/LUNA.mp3",
      name: "LUNA",
      artist: "FERXXO",
    }
  ];
  user = null;
  items = [
    {
        label: 'Opciones',
        items: [
            {
                label: 'Bloquear',
                icon: 'fas fa-lock',
                command: () => {
                  this.globalService.sendRequest({ type: 'LOCK_SESION', user: this.user });
                },
            },
            {
                label: 'Cerrar sesión',
                icon: 'fas fa-door-open',
                command: () => {
                  this.globalService.sendRequest({ type: 'CLOSE_SESION', user: null });
                },
            }
        ]
    }
  ];
  displayController = false;
  date = new Date();
  @ViewChild('container', { static: true }) container: ElementRef;
  private draggingElement: HTMLElement | null = null;
  private mouseMoveListener: (() => void) | null = null;
  private mouseUpListener: (() => void) | null = null;
  private positionX: number = 0;
  private positionY: number = 0;
  constructor(
    private messageService: MessageService,
    private terminalService: TerminalService,
    private globalService: GlobalService,
    private renderer: Renderer2,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  ngOnInit() {
    this.wifi();
    this.setValueScreen();
    setTimeout(() => {
      this.boot = false;
    }, 8000);
    this.dockItems = [
      {
        label: 'Finder',
        tooltipOptions: {
          tooltipLabel: 'Finder',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/finder.svg',
        command: () => {
          // this.displayFinder = true;
        },
      },
      {
        label: 'Terminal',
        tooltipOptions: {
          tooltipLabel: 'Terminal',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/terminal.svg',
        command: () => {
          this.displayTerminal = true;
        },
      },
      {
        label: 'VS code',
        tooltipOptions: {
          tooltipLabel: 'Terminal',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/vscode.png',
        command: () => {
          this.displayVscode = true;
        },
      },
      {
        label: 'Safari',
        tooltipOptions: {
          tooltipLabel: 'Safari',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/safari.svg',
        command: () => {
          this.displaySafari = true;
        },
      },
      {
        label: 'Gamepad',
        tooltipOptions: {
          tooltipLabel: 'Gamepad',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/gamepad.png',
        command: () => {
          this.displayController = true;
        },
      }
    ];

    this.menubarItems = [
      {
        label: 'Finder',
        styleClass: 'menubar-root',
      },
      {
        label: 'Archivo'
      },
      {
        label: 'Edicion'
      },
      {
        label: 'Visualizacion'
      },
      {
        label: 'Ir',
      },
      {
        label: 'Ventana',
      },
      {
        label: 'Ayuda',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    this.subscription = this.terminalService.commandHandler.subscribe(
      (command) => this.commandHandler(command)
    );
  }

  createFolder(){
    // Crear el contenedor de la carpeta
    const folderContainer = this.renderer.createElement('div');
    this.renderer.setStyle(folderContainer, 'position', 'absolute');
    this.renderer.setStyle(folderContainer, 'top', `${this.positionY}px`);
    this.renderer.setStyle(folderContainer, 'left', `${this.positionX}px`);
    this.renderer.setStyle(folderContainer, 'cursor', 'pointer');
    this.renderer.setStyle(folderContainer, 'text-align', 'center');
    this.renderer.addClass(folderContainer, 'carpeta');

    // Crear la imagen de la carpeta
    const folderImage = this.renderer.createElement('img');
    this.renderer.setAttribute(folderImage, 'src', '/assets/icons/folder.png');
    this.renderer.setStyle(folderImage, 'height', '80px');
    this.renderer.appendChild(folderContainer, folderImage);

    // Crear el nombre de la carpeta
    const folderName = this.renderer.createElement('div');
    const textNode = this.renderer.createText('Nueva carpeta');
    this.renderer.appendChild(folderName, textNode);
    this.renderer.setStyle(folderName, 'margin-top', '5px');
    this.renderer.setStyle(folderName, 'font-size', '14px');
    this.renderer.appendChild(folderContainer, folderName);

    // Añadir eventos de arrastrar y soltar
    this.renderer.listen(folderImage, 'mousedown', (mouseEvent: MouseEvent) => this.onMouseDown(mouseEvent, folderContainer));
    
    // Hacer el texto editable al hacer clic
    this.renderer.listen(folderName, 'click', () => this.makeTextEditable(folderName));

    // Agregar la carpeta al contenedor
    const containerElement = this.container.nativeElement;
    this.renderer.appendChild(containerElement, folderContainer);
  }

  makeTextEditable(folderName: HTMLElement): void {
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', 'text');
    this.renderer.setStyle(input, 'font-size', '14px');
    this.renderer.setStyle(input, 'text-align', 'center');
    this.renderer.setStyle(input, 'display', 'block');
    input.value = folderName.innerText;
    this.renderer.appendChild(folderName.parentNode, input);
    this.renderer.removeChild(folderName.parentNode, folderName);

    input.focus();
    input.select();

    this.renderer.listen(input, 'blur', () => this.makeTextStatic(input, folderName));
    
  }

  makeTextStatic(input: HTMLInputElement, folderName: HTMLElement): void {
    const newText = input.value;
  
    // Eliminar el input
    this.renderer.removeChild(input.parentNode, input);
  
    // Revisar si el div de texto ya existe y eliminarlo si es necesario
    const existingFolderName = folderName;
    if (existingFolderName) {
      this.renderer.removeChild(existingFolderName.parentNode, existingFolderName);
    }
  
    // Crear el nuevo div con el texto actualizado
    const newFolderName = this.renderer.createElement('div');
    const textNode = this.renderer.createText(newText);
    this.renderer.appendChild(newFolderName, textNode);
    this.renderer.setStyle(newFolderName, 'margin-top', '5px');
    this.renderer.setStyle(newFolderName, 'font-size', '14px');
    this.renderer.appendChild(input.parentNode, newFolderName);
  
    // Añadir evento de clic para editar el texto de nuevo
    this.renderer.listen(newFolderName, 'click', () => this.makeTextEditable(newFolderName));
    this.renderer.listen(input, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.makeTextStatic(input, folderName);
      }
    })
  }

  onMouseDown(event: MouseEvent, element: HTMLElement): void {
    event.preventDefault();  // Previene comportamientos predeterminados del navegador

    this.draggingElement = element;
    this.positionX = event.clientX - element.getBoundingClientRect().left;
    this.positionY = event.clientY - element.getBoundingClientRect().top;

    // Añadir eventos para mousemove y mouseup
    this.mouseMoveListener = this.renderer.listen('window', 'mousemove', this.onMouseMove.bind(this));
    this.mouseUpListener = this.renderer.listen('window', 'mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent): void {
    if (this.draggingElement) {
      const containerRect = this.container.nativeElement.getBoundingClientRect();
      const elementRect = this.draggingElement.getBoundingClientRect();

      let xPos = event.clientX - this.positionX;
      let yPos = event.clientY - this.positionY;

      // Asegurarse de que el elemento no salga del contenedor
      xPos = Math.max(containerRect.left, Math.min(xPos, containerRect.right - elementRect.width));
      yPos = Math.max(containerRect.top, Math.min(yPos, containerRect.bottom - elementRect.height));

      this.renderer.setStyle(this.draggingElement, 'left', `${xPos - containerRect.left}px`);
      this.renderer.setStyle(this.draggingElement, 'top', `${yPos - containerRect.top}px`);
    }
  }

  onMouseUp(): void {
    // Detener el arrastre
    this.draggingElement = null;

    // Eliminar listeners de mousemove y mouseup
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }
    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }

  

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event) {
    if(event){
      event.preventDefault(); // Previene que aparezca el menú predeterminado del navegador
      this.menuLeft = event.clientX;
      this.menuTop = event.clientY;
      setTimeout(() => {
          this.menu.show(event);
      }, 100);
      this.menu.hide();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    this.menu.hide();
  }

  setValueScreen() {
    document.body.style.filter = `brightness(${this.valueScreen / 100})`;
  }

  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      this.terminalService.sendResponse(response as string);
    }
  }

  wifi(){
    this.wifiOn = !this.wifiOn;
    this.globalService.sendRequest({ type: 'STATUS_WIFI', status: this.wifiOn });
  }

  themeChange() {
    this.themeStatus = !this.themeStatus;
    let theme = this.themeStatus ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    this.globalService.switchTheme(theme);
  }

   ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
