import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  Inject,
  OnDestroy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import onScan from 'onscan.js';

@Component({
  selector: 'app-input-codebar',
  templateUrl: './input-codebar.component.html',
  styleUrls: ['./input-codebar.component.scss'],
})
export class InputCodebarComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() srcIcon: string;
  @Output() codeBarRead: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchInput') sInput;
  render = false;


  constructor(@Inject(DOCUMENT) private document: Document) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 150);
  }

  ionViewDidLeave(): void {
    this.render = false;
    onScan.detachFrom(this.document);
  }

  ngOnDestroy(): void {
    this.render = false;
    onScan.detachFrom(this.document);
  }


  ngOnInit() {
    if (!this.render) {
      this.render = true;
    this.document.addEventListener('scan', (event) => this.scanBarcode(event));
    onScan.attachTo(document, {
      minLength: 1,
      reactToPaste: false,
      keyCodeMapper: (event) => {
        if (event.which === 191) {
          return '/';
        }
        if (event.which === 32) {
          return ' ';
        }
        return onScan.decodeKeyEvent(event);
      },
    });
  }
  }

  private scanBarcode(event: CustomEvent): void {
    console.log(event?.detail?.scanCode);
    const value = event?.detail?.scanCode;
    if (value) {
      this.codeBarRead.emit(value);
    }
  }
}
