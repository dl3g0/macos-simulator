import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  request = new BehaviorSubject<Object>(undefined);
  request$ = this.request.asObservable();
  constructor() { }

  sendRequest(data){
    this.request.next(data);
  }
}
