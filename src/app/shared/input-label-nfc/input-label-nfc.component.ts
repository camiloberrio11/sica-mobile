import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NFC } from '@ionic-native/nfc/ngx';
import { ToastService } from 'src/app/core/services/toast.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-input-label-nfc',
  templateUrl: './input-label-nfc.component.html',
  styleUrls: ['./input-label-nfc.component.scss'],
})
export class InputLabelNfcComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() srcIcon: string;
  @Output() nfcValue: EventEmitter<User> = new EventEmitter<User>();
  readerMode$: Subscription;
  valueInput = '';

  constructor(
    private nfc: NFC,
    private toastrService: ToastService,
    private readonly backendSicaService: SicaBackendService,
    private readonly loadingService: LoadingService,
  ) {}

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
        if (!event.tag?.ndefMessage) {
          this.toastrService.createToast('NFC vacío', 'warning');
          return;
        }
        const decodeNfc = this.nfc
          .bytesToString(event.tag?.ndefMessage[0]?.payload)
          ?.split('en')
          ?.pop();
        this.sendChildren(decodeNfc);
      });
  }

  ngOnDestroy(): void {
    this.readerMode$?.unsubscribe();
  }

  ionViewWillLeave() {
    this.readerMode$.unsubscribe();
  }

  sendChildren(tokenDecode: string): void {
    if (tokenDecode) {
      this.getInfoByToken(tokenDecode);
    }
  }

  private async getInfoByToken(code: string): Promise<void> {
    await this.loadingService.initLoading('Obteniendo información del token');
    this.backendSicaService.getUserByToken(code).subscribe(
      async (data) => {
        this.loadingService.endLoading();
        this.valueInput = `${data?.name?.first} ${data?.name?.last}`;
        this.nfcValue.emit(data);
      },
      async (err) => {
        this.loadingService.endLoading();
        this.toastrService.createToast('No se ha encontrado información', 'warning');
        this.valueInput = '';
      }
    );
  }
}
