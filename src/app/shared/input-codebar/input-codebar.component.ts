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
import { CategoryTool } from 'src/app/core/models/CategoryTool';

@Component({
  selector: 'app-input-codebar',
  templateUrl: './input-codebar.component.html',
  styleUrls: ['./input-codebar.component.scss'],
})
export class InputCodebarComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() isRegister: boolean;
  @Input() isCategory: boolean;
  @Input() placeholder = '';
  @Input() srcIcon: string;
  @Output() codeBarRead: EventEmitter<ToolByBarcodeResponseService> =
    new EventEmitter<ToolByBarcodeResponseService>();
  @Output() barcodeCategory?: EventEmitter<CategoryTool> =
    new EventEmitter<CategoryTool>();
  @Output() registerResult?: EventEmitter<string> = new EventEmitter<string>();

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

  ngOnInit() {}

  handleFocus(): void {
    if (!this.render) {
      this.render = true;
      this.document.addEventListener('scan', (event) => {
        this.scanBarcode(event);
        this.document.removeEventListener('scan', () => console.log('removed'));
      });
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
    const value = event?.detail?.scanCode;
    if (!value) {
      this.toastrService.createToast(
        'No se ha encontrado valor para el código de barras',
        'secondary'
      );
      return;
    }
    if (this.isRegister) {
      this.registerResult.emit(value);
      return;
    }
    if (this.isCategory) {
      this.findCategoryBarcode(value);
      return;
    }
    await this.loadingService.initLoading('Obteniendo información de equipo');
    this.backendServiceSica.getToolByCodeBar(value).subscribe(
      async (data) => {
        this.valueInput = data?.barcode;
        this.cd.detectChanges();
        this.codeBarRead.emit(data);
        await this.loadingService.endLoading();
      },
      async (err) => {
        this.toastrService.createToast(
          'No se ha encontrado el equipo',
          'warning'
        );
        await this.loadingService.endLoading();
      }
    );
  }

  private async findCategoryBarcode(barcode: string): Promise<void> {
    await this.loadingService.initLoading(
      'Obteniendo información de categoría'
    );
    this.backendServiceSica.getCategoryToolByBarcode(barcode).subscribe(
      async (data) => {
        this.valueInput = data?.barcode;
        this.cd.detectChanges();
        this.barcodeCategory.emit(data);
        await this.loadingService.endLoading();
      },
      async (err) => {
        this.toastrService.createToast(
          'No se ha encontrado categoría',
          'warning'
        );
        await this.loadingService.endLoading();
      }
    );
  }
}
