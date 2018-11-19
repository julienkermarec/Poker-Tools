import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


// @Component({
//   template: `
//     <ion-list radio-group [(ngModel)]="lang">
//       <ion-item>
//         <ion-label>French</ion-label>
//         <ion-radio value="fr" (ionSelect)="close()"></ion-radio>
//       </ion-item>
//       <ion-item >
//         <ion-label>English</ion-label>
//         <ion-radio value="en" (ionSelect)="close()"></ion-radio>
//       </ion-item>
//     </ion-list>
//   `
// })

@IonicPage()
@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html',
})
export class LangPage {
  checked_lang = null;

  constructor(
    public viewCtrl: ViewController,
    private platform: Platform,
    private translate: TranslateService
  ) {

    this.platform.ready().then(() => {
      let browser_lang = this.translate.getBrowserLang();
      if(this.translate.currentLang != null){
        console.log("A");
        this.checked_lang = this.translate.currentLang;
      }
      else if(browser_lang != null){
        console.log("B");
        this.translate.use(browser_lang);
        this.checked_lang = browser_lang;
      }
      else
      {
        console.log("C");
        this.translate.use('en');
        this.checked_lang = 'en';
      }
      console.log("browser_lang",browser_lang);
      console.log("constructor",this.checked_lang);
      console.log("translate",this.translate);
    });
  }

  close() {
    console.log("close click",this.checked_lang);
    this.translate.use(this.checked_lang);
    this.viewCtrl.dismiss();
  }
}
