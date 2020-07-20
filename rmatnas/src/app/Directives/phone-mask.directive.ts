import {
  OnInit,
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { isNumber } from 'util';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective implements OnInit {
  constructor(private el: ElementRef, private red: Renderer2) {}

  ngOnInit() {}
  @HostListener('input')
  onkeypress() {
    const x = this.el.nativeElement.value;
    if (isNaN(x) || x.length > 10) { this.el.nativeElement.value = x.slice(0, -1); }
   }
}
