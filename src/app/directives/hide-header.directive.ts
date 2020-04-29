import {Directive, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {

  @Input() filters: any;

  private lastY = 0;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {
  }

  ngOnInit(): void {
    this.filters = this.filters.el;
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.filters, 'transition', 'margin-top 700ms');
    });
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    if ($event.detail.scrollTop > this.lastY) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.filters, 'margin-top', `-${this.filters.clientHeight}px`);
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.filters, 'margin-top', '0');
      });
    }

    this.lastY = $event.detail.scrollTop;
  }
}
