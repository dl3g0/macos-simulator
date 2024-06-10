import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootComponent } from '../../components/boot/boot.component';
import { LoginComponent } from '../../components/login/login.component';
import { DesktopComponent } from '../../components/desktop/desktop.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafariComponent } from '../../components/apps/safari/safari.component';
import { TerminalComponent } from '../../components/apps/terminal/terminal.component';
import { NotifyComponent } from '../../components/system-ui/notify/notify.component';
import { VsCodeComponent } from '../../components/apps/vs-code/vs-code.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TaskManagerComponent } from '../../components/apps/task-manager/task-manager.component';
import { NoNetworkComponent } from '../../components/apps/safari/no-network/no-network.component';

import { NgxGamepadModule } from 'ngx-gamepad';
import { XboxControllerComponent } from '../../components/apps/xbox-controller/xbox-controller.component';


@NgModule({
  declarations: [
    BootComponent,
    LoginComponent,
    DesktopComponent,
    //APLICACIONES
    SafariComponent,
    TerminalComponent,
    NotifyComponent,
    VsCodeComponent,
    TaskManagerComponent,
    NoNetworkComponent,
    XboxControllerComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    NgApexchartsModule,
    NgxGamepadModule
  ],
  exports:[
    BootComponent,
    LoginComponent,
    DesktopComponent,
    ReactiveFormsModule,
    FormsModule,
    //APLICACIONES
    SafariComponent,
    TerminalComponent,
    NotifyComponent,
    VsCodeComponent,
    NgApexchartsModule,
    TaskManagerComponent,
    NoNetworkComponent,
    NgxGamepadModule,
    XboxControllerComponent
  ]
})
export class GlobalModule { }
