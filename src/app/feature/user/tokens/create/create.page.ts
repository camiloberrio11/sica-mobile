import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';

const ID_SIMULATE_USER = 'abc123YKNDKH8IYHJM31214DASA';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  nfcSubs: Subscription;
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private toastrService: ToastService
  ) {}

  ionViewWillLeave() {
    this.nfcSubs.unsubscribe();
  }

  ngOnInit() {
    this.nfcSubs = this.nfc
      .addNdefListener(
        () => {
          console.log('successfully attached ndef listener');
        },
        (err) => {
          console.log('error attaching ndef listener', err);
        }
      )
      .subscribe((event) => {
        console.log(event);
        this.handleClick(true);
      });
  }

  async handleClick(event: boolean): Promise<void> {
    const message = [this.ndef.textRecord(ID_SIMULATE_USER)];
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
  }

  onNfc(nfcEvent) {
    console.log(nfcEvent);
    this.handleClick(true);
  }
}
