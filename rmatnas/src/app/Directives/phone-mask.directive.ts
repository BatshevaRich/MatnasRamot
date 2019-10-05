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
  // @HostBinding('value')value1:String;
  constructor(private el: ElementRef, private red: Renderer2) {}

  ngOnInit() {}
  @HostListener('input')
  onkeypress() {
    let x = this.el.nativeElement.value;
    if (isNaN(x) || x.length > 9) { this.el.nativeElement.value = x.slice(0, -1); }
   // if (isNaN(x) || x.length > 9) { this.red.setAttribute(this.el.nativeElement,"value"," x.slice(0, -1)"); }
  }
}