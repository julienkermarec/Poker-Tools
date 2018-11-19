import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

/**
 * Assure le bon format des données contenues dans l'url
 * Prévient les failles XSS
 *
 * @export
 * @class SafeUrlPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

/**
 * Assure le bon format des données contenues dans l'html
 * Prévient les failles XSS
 *
 * @export
 * @class SafeHtmlPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

/**
 * Assure le bon format des données contenues dans le css
 * Prévient les failles XSS
 *
 * @export
 * @class SafeStylePipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'safeStyle' })
export class SafeStylePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
