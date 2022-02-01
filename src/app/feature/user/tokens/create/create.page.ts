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
  identification: number;
  exist = false;
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private toastrService: ToastService,
    private sicaBackendService: SicaBackendService,
    private loadingService: LoadingService
  ) {}

  ionViewWillLeave() {
    this.nfcSubs?.unsubscribe();
  }

  async handleClick(event: boolean): Promise<void> {
    await this.loadingService.initLoading('Obteniendo información');
    this.sicaBackendService.getTokenByDocument(`${this.identification}`).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        this.exist = true;
        this.listenerAndWriteNfc(data?.token);
      },
      async (error) => {
        await this.loadingService.endLoading();
        this.exist = false;
        this.toastrService.createToast(
          'No se ha encontrado registros',
          'warning'
        );
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
          this.exist = false;
          this.identification = null;
          this.nfcSubs?.unsubscribe();
        } catch (error) {
          this.toastrService.createToast(
            'No se ha podido escribir el token',
            'warning'
          );
        }
      });
  }
}
