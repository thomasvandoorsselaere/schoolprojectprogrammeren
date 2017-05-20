import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  templateUrl: './collapsible-well.component.html'
})
export class CollapsibleWellComponent {
  visible = false;

  toggleContent() {
    this.visible = !this.visible;
  }
}
