import { Component, Output, input, output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-xbox-controller',
  templateUrl: './xbox-controller.component.html',
  styleUrl: './xbox-controller.component.scss'
})
export class XboxControllerComponent implements OnInit{
  displayController = true;
  @Output() close = new EventEmitter<Object>();
  closeDialog() {
    this.close.emit();
  }

  constructor(){

  }

  ngOnInit(): void {

  }

  
}
