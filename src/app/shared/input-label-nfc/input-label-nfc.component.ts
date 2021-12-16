import { WorkerSica } from './../../core/models/Worker';
import {
  ChangeDetectorRef,
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
  @Input() placeholder = 'Toca para leer token';
  @Input() srcIcon: string;
  @Input() id: string;
  @Input() isWorker: boolean;
  @Output() nfcValue: EventEmitter<User> = new EventEmitter<User>();
  @Output() nfcValueWorker: EventEmitter<WorkerSica> = new EventEmitter<WorkerSica>();

  readerMode$: Subscription;
  valueInput = '';

  constructor(
    private nfc: NFC,
    private toastrService: ToastService,
    private readonly backendSicaService: SicaBackendService,
    private readonly loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.readerMode$?.unsubscribe();
  }

  ionViewWillLeave() {
    this.readerMode$.unsubscribe();
  }

  startNfc(): void {
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
    this.valueInput = '';
    this.cd.detectChanges();
    if (this.isWorker) {
      this.getWorker(code);
      return;
    }
    await this.loadingService.initLoading('Obteniendo información del token');
    this.backendSicaService.getUserByToken(code).subscribe(
      async (data) => {
        this.loadingService.endLoading();
        this.valueInput = `${data?.name?.first} ${data?.name?.last}`;
        this.cd.detectChanges();
        this.nfcValue.emit(data);
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

  private async getWorker(code: string): Promise<void> {
    await this.loadingService.initLoading('Obteniendo información del token');
    this.backendSicaService.getWorkerByToken(code).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        this.valueInput = ``;
        this.cd.detectChanges();
        this.nfcValueWorker.emit(data);
      },
      async (err) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast('Ocurrió un error', 'danger');
      }
    );
  }
}
