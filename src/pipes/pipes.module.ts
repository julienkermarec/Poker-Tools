import { NgModule } from '@angular/core';
import { SafeUrlPipe, SafeHtmlPipe, SafeStylePipe } from './safe/safe';

export const pipes = [
  SafeUrlPipe,
  SafeHtmlPipe,
  SafeStylePipe
];

@NgModule({
	declarations: pipes,
	imports: [],
	exports: pipes
})
export class PipesModule {}
