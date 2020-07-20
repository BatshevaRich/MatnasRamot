import {
  OnInit,
  Directive,
  HostBinding,
  Input,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
  @Input() Border: string;
  @HostBinding('style.border') bordeStyle: string;
  constructor(private el: ElementRef, private rend: Renderer2) {}

  ngOnInit() {
    this.rend.setStyle(this.el.nativeElement, 'color', this.Border);
  }
  @HostListener('keypress')
  onKeyPress() {
    this.bordeStyle = 'groove';
  }
  @HostListener('keyup')
  onKeyUp() {
    this.bordeStyle = '';
  }
}
