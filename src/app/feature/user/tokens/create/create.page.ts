import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

const ID_SIMULATE_USER = 'abc123YKNDKH8IYHJM31214DASA';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  nfcSubs: Subscription;
  identification: string;
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private toastrService: ToastService,
    private sicaBackendService: SicaBackendService,
    private loadingService: LoadingService
  ) {}

  ionViewWillLeave() {
    this.nfcSubs.unsubscribe();
  }

  handleClick(event: boolean): void {
    this.loadingService.initLoading('Obteniendo información');
    this.sicaBackendService.getTokenByDocument(this.identification).subscribe(
      (data) => {
        this.loadingService.endLoading();
        this.listenerAndWriteNfc(data?.token);
      },
      (error) => {
        this.toastrService.createToast(
          'No se ha encontrado registros',
          'warning'
        );
        this.loadingService.endLoading();
      }
    );
  }

  private listenerAndWriteNfc(token: string) {
    this.loadingService.endLoading();
    this.nfcSubs = this.nfc
      .addNdefListener(
        () => {
          console.log('successfully attached ndef listener');
        },
        (err) => {
          console.log('error attaching ndef listener', err);
        }
      )
      .subscribe(async () => {
        const message = [this.ndef.textRecord(token)];
        try {
          const result = await this.nfc.write(message);
          this.toastrService.createToast('Token creado', 'success');
          console.log('Result', result);
        } catch (error) {
          this.toastrService.createToast(
            'No se ha podido escribir el token',
            'warning'
          );
        }
      });
  }
}
