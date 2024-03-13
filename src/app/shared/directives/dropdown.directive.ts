import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @Input() dCollapsed: boolean;
  constructor() { }

  @HostBinding('class.show') get show() {
    return this.dCollapsed;
  }

}
