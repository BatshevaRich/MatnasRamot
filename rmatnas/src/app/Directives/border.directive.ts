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
  @HostBinding('style.border') bordeStyle: String;
  constructor(private el: ElementRef, private rend: Renderer2) {}

  ngOnInit() {
    // this.el.nativeElement.style.color=this.Border;
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
