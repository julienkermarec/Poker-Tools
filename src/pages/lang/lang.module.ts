import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LangPage } from './lang';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LangPage,
  ],
  imports: [
    IonicPageModule.forChild(LangPage),
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    })
  ],
  entryComponents: [
    LangPage,
  ]
})
export class LangPageModule {}
