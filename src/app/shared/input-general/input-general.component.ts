import { DOCUMENT } from '@angular/common';
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
import onScan from 'onscan.js';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-input-general',
  templateUrl: './input-general.component.html',
  styleUrls: ['./input-general.component.scss'],
})
export class InputGeneralComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() srcIcon: string;
  @Input() typeInput: 'text' | 'password';
  @Input() isCodeBarInput: boolean;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchInput') sInput;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastrService: ToastService
  ) {}

  ionViewDidEnter() {
    if (this.isCodeBarInput) {
      setTimeout(() => {
        this.sInput.setFocus();
      }, 150);
    }
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.document.removeEventListener('scan', () =>
      console.log('Event scan removed')
    );
    onScan.detachFrom(this.document);
  }

  handleInput(event: any): void {
    this.inputChange.emit(event?.target?.value);
  }

  private scanBarcode(event: Event | any): void {
    console.log(event);
  }
}
