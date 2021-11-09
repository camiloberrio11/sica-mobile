import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-item-menu',
  templateUrl: './button-item-menu.component.html',
  styleUrls: ['./button-item-menu.component.scss'],
})
export class ButtonItemMenuComponent implements OnInit {
  @Input() title: string;
  @Input() srcImg: string;
  @Input() srcImgTwo: string;
  @Input() urlRedirecet: string;
  @Output() clickedBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(): void {
    if (this.urlRedirecet) {
      this.router.navigate([this.urlRedirecet]);
    } else {
      this.clickedBtn.emit(true);
    }
  }
}
