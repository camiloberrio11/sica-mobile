import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NFC } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-input-label-nfc',
  templateUrl: './input-label-nfc.component.html',
  styleUrls: ['./input-label-nfc.component.scss'],
})
export class InputLabelNfcComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() srcIcon: string;
  @Output() nfcValue: EventEmitter<string> = new EventEmitter<string>();
  readerMode$: Subscription;

  constructor(private nfc: NFC) {}

  ngOnInit() {
    this.readerMode$ = this.nfc
      .addNdefListener(
        () => {
          console.log('successfully attached ndef listener');
        },
        (err) => {
          console.log('error attaching ndef listener', err);
        }
      )
      .subscribe((event) => {
        const decodeNfc = this.nfc
          .bytesToString(event.tag.ndefMessage[0].payload)
          ?.split('en')
          ?.pop();
        this.sendChildren(decodeNfc);
      });
  }

  ngOnDestroy(): void {
    this.readerMode$?.unsubscribe();
  }

  sendChildren(tokenDecode: string): void {
    if (tokenDecode) {
      this.nfcValue.emit(tokenDecode);
    }
  }
}
