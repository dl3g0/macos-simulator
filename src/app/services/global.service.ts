import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core'
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public lang: string;
  public theme:string;
  request = new BehaviorSubject<Object>(undefined);
  request$ = this.request.asObservable();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private config: PrimeNGConfig,
  ) { }

  sendRequest(data){
    this.request.next(data);
  }

  switchTheme(theme: string) {
    this.theme = theme;
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }

  changeLanguage(type: string) {
    this.lang = type;
    this.translateService.use(type);
    this.translateService.get('primeng').subscribe((res) => this.config.setTranslation(res));
  }
}
