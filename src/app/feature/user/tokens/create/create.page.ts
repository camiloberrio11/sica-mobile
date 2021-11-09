import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ToastService } from 'src/app/core/services/toast.service';

const ID_SIMULATE_USER = 'abc123YKNDKH8IYHJM31214DASA';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  constructor(
    private nfc: NFC,
    private loadingService: LoadingService,
    private ndef: Ndef,
    private toastrService: ToastService
  ) {}

  ngOnInit() {
    this.nfc.addNdefListener(this.onNfc);
  }

  async handleClick(event: boolean): Promise<void> {
    this.loadingService.initLoading('Escribiendo nfc');
    const message = [this.ndef.textRecord(ID_SIMULATE_USER)];
    try {
      const result = await this.nfc.write(message);
      console.log('Result');
    } catch (error) {
      this.toastrService.createToast(
        'No se ha podido escribir el token',
        'warning'
      );
    }
  }

  onNfc(nfcEvent) {
    console.log(nfcEvent);
    this.handleClick(true);
  }
}
