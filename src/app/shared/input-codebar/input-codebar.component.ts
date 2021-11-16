import { ToastService } from 'src/app/core/services/toast.service';
import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import onScan from 'onscan.js';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';

@Component({
  selector: 'app-input-codebar',
  templateUrl: './input-codebar.component.html',
  styleUrls: ['./input-codebar.component.scss'],
})
export class InputCodebarComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() srcIcon: string;
  @Output() codeBarRead: EventEmitter<ToolByBarcodeResponseService> = new EventEmitter<ToolByBarcodeResponseService>();
  @ViewChild('searchInput') sInput;
  render = false;
  valueInput = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loadingService: LoadingService,
    private backendServiceSica: SicaBackendService,
    private cd: ChangeDetectorRef,
    private readonly toastrService: ToastService
  ) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 150);
  }

  ionViewDidLeave(): void {
    this.render = false;
    onScan.detachFrom(this.document);
  }

  ngOnDestroy(): void {
    this.render = false;
    onScan.detachFrom(this.document);
  }

  ngOnInit() {
    if (!this.render) {
      this.render = true;
      this.document.addEventListener('scan', (event) =>
        this.scanBarcode(event)
      );
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
  }

  private async scanBarcode(event: any | CustomEvent<any>): Promise<void> {
    await this.loadingService.initLoading('Obteniendo información de equipo');
    this.backendServiceSica.getToolByCodeBar('ABC12310').subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        this.valueInput = data?.barcode;
        this.cd.detectChanges();
        this.codeBarRead.emit(data);
      },
      async (err) => {
        this.toastrService.createToast('No se ha encontrado el equipo', 'warning');
        await this.loadingService.endLoading();
      }
    );
  }
}
