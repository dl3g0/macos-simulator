import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
  providers: [MessageService, TerminalService],
})
export class DesktopComponent implements OnInit, OnDestroy{
  @ViewChild('menu') menu: any;
  displayTerminal: boolean | undefined;

  displayFinder: boolean | undefined;

  displayGalleria: boolean | undefined;

  dockItems: MenuItem[] | undefined;

  menubarItems: any[] | undefined;

  responsiveOptions: any[] | undefined;

  images: any[] | undefined;

  nodes: any[] | undefined;

  subscription: Subscription | undefined;

  boot = true;
  wifiOn = false;
  bluetoothOn = false;
  airdropOn = false;
  valueScreen = 99;
  valueSound = 50;
  login = false;
  focusingOn = false;

  itemsMenuAntiClick = [
    {
      label: 'Nueva carpeta'
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
  constructor(
    private messageService: MessageService,
    private terminalService: TerminalService
  ) {}

  ngOnInit() {
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
        label: 'App Store',
        tooltipOptions: {
          tooltipLabel: 'App Store',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/appstore.svg',
        command: () => {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'An unexpected error occurred while signing in.',
          //   detail: 'UNTRUSTED_CERT_TITLE',
          // });
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
        label: 'Photos',
        tooltipOptions: {
          tooltipLabel: 'Photos',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/photos.svg',
        command: () => {
          // this.displayGalleria = true;
        },
      },
      {
        label: 'GitHub',
        tooltipOptions: {
          tooltipLabel: 'GitHub',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/github.svg',
      },
      {
        label: 'Trash',
        tooltipOptions: {
          tooltipLabel: 'Trash',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/icons/trash.png',
        command: () => {
          // this.messageService.add({ severity: 'info', summary: 'Empty Trash' });
        },
      },
    ];

    this.menubarItems = [
      {
        label: 'Finder',
        styleClass: 'menubar-root',
      },
      {
        label: 'Archivo',
        // items: [
        //     {
        //         label: 'New',
        //         icon: 'pi pi-fw pi-plus',
        //         items: [
        //             {
        //                 label: 'Bookmark',
        //                 icon: 'pi pi-fw pi-bookmark'
        //             },
        //             {
        //                 label: 'Video',
        //                 icon: 'pi pi-fw pi-video'
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Delete',
        //         icon: 'pi pi-fw pi-trash'
        //     },
        //     {
        //         separator: true
        //     },
        //     {
        //         label: 'Export',
        //         icon: 'pi pi-fw pi-external-link'
        //     }
        // ]
      },
      {
        label: 'Edicion',
        // items: [
        //     {
        //         label: 'Left',
        //         icon: 'pi pi-fw pi-align-left'
        //     },
        //     {
        //         label: 'Right',
        //         icon: 'pi pi-fw pi-align-right'
        //     },
        //     {
        //         label: 'Center',
        //         icon: 'pi pi-fw pi-align-center'
        //     },
        //     {
        //         label: 'Justify',
        //         icon: 'pi pi-fw pi-align-justify'
        //     }
        // ]
      },
      {
        label: 'Visualizacion',
        // items: [
        //     {
        //         label: 'New',
        //         icon: 'pi pi-fw pi-user-plus'
        //     },
        //     {
        //         label: 'Delete',
        //         icon: 'pi pi-fw pi-user-minus'
        //     },
        //     {
        //         label: 'Search',
        //         icon: 'pi pi-fw pi-users',
        //         items: [
        //             {
        //                 label: 'Filter',
        //                 icon: 'pi pi-fw pi-filter',
        //                 items: [
        //                     {
        //                         label: 'Print',
        //                         icon: 'pi pi-fw pi-print'
        //                     }
        //                 ]
        //             },
        //             {
        //                 icon: 'pi pi-fw pi-bars',
        //                 label: 'List'
        //             }
        //         ]
        //     }
        // ]
      },
      {
        label: 'Ir',
        // items: [
        //     {
        //         label: 'Edit',
        //         icon: 'pi pi-fw pi-pencil',
        //         items: [
        //             {
        //                 label: 'Save',
        //                 icon: 'pi pi-fw pi-calendar-plus'
        //             },
        //             {
        //                 label: 'Delete',
        //                 icon: 'pi pi-fw pi-calendar-minus'
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Archieve',
        //         icon: 'pi pi-fw pi-calendar-times',
        //         items: [
        //             {
        //                 label: 'Remove',
        //                 icon: 'pi pi-fw pi-calendar-minus'
        //             }
        //         ]
        //     }
        // ]
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

  dragAndDrop(){
    
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    if(event){
      event.preventDefault(); // Previene que aparezca el menú predeterminado del navegador
      this.menuLeft = event.clientX;
      this.menuTop = event.clientY;
      this.menu.hide();
      setTimeout(() => {
          this.menu.show(event);
      }, 100);
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
