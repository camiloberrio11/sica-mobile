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

@Component({
  selector: 'app-input-general',
  templateUrl: './input-general.component.html',
  styleUrls: ['./input-general.component.scss'],
})
export class InputGeneralComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() value: string;
  @Input() disable: boolean;
  @Input() srcIcon: string;
  @Input() typeInput: 'text' | 'password';
  // @Input() isCodeBarInput: boolean;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    // private toastrService: ToastService
  ) {}

  // ionViewDidEnter() {
  //   if (this.isCodeBarInput) {
  //     setTimeout(() => {
  //       this.sInput.setFocus();
  //     }, 150);
  //   }
  // }

  ngOnInit(): void {
  //   if (this.isCodeBarInput) {
  //   this.document.addEventListener('scan', (event) => this.scanBarcode(event));
  //   onScan.attachTo(document, {
  //     minLength: 1,
  //     reactToPaste: false,
  //     keyCodeMapper: (event) => {
  //       if (event.which === 191) {
  //         return '/';
  //       }
  //       if (event.which === 32) {
  //         return ' ';
  //       }
  //       return onScan.decodeKeyEvent(event);
  //     },
  //   });
  // }
  }

  ngOnDestroy(): void {
    // this.document.removeEventListener('scan', () =>
    //   console.log('Event scan removed')
    // );
  }

  handleInput(event: any): void {
    this.inputChange.emit(event?.target?.value);
  }

  // private scanBarcode(event: CustomEvent ): void {
  //   this.handleInput(event?.detail?.scanCode);
  // }
}
