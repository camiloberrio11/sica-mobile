import { User } from './../../core/models/User';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NFC } from '@ionic-native/nfc/ngx';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

@Component({
  selector: 'app-capture-reader-nfc',
  templateUrl: './capture-reader-nfc.component.html',
  styleUrls: ['./capture-reader-nfc.component.scss'],
})
export class CaptureReaderNfcComponent implements OnInit {
  @Output() userNfcValue: EventEmitter<User> = new EventEmitter<User>();
  readerMode$: Subscription;
  valueInput = '';

  constructor(
    private nfc: NFC,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
    private backendSicaService: SicaBackendService
  ) {}

  ngOnInit() {}

  readNfc(): void {
    this.valueInput = 'Leyendo...';
    const flags = this.nfc.FLAG_READER_NFC_A || this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
      (tag) => {
        if (!tag?.ndefMessage) {
          this.toastrService.createToast('NFC vacío', 'warning');
          return;
        }
        const decodeNfc = this.nfc
          .bytesToString(tag?.ndefMessage[0]?.payload)
          ?.split('en')
          ?.pop();
        this.getInfoByToken(decodeNfc);
      },
      (err) => {
        console.log('Error reading tag', err);
      }
    );
  }

  private async getInfoByToken(code: string): Promise<void> {
    if (!code) {
      return;
    }
    this.cd.detectChanges();
    await this.loadingService.initLoading('Obteniendo información del token');
    this.backendSicaService.getUserByToken(code).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        this.valueInput = `${data?.name?.first} ${data?.name?.last}`;
        this.cd.detectChanges();
        this.userNfcValue.emit(data);
      },
      async (err) => {
        await this.loadingService.endLoading();
        this.toastrService.createToast(
          'No se ha encontrado información',
          'warning'
        );
        this.valueInput = '';
      }
    );
  }
}
