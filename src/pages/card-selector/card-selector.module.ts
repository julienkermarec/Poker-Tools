import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSelectorPage } from './card-selector';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CardSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSelectorPage),
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    })
  ]
})
export class CardSelectorModule {}
