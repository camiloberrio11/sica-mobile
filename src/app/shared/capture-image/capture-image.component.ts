import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastService } from 'src/app/core/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.scss'],
})
export class CaptureImageComponent implements OnInit {
  @Input() srcImg: string;
  @Output() dataPhoto: EventEmitter<string> = new EventEmitter<string>();
  srcImgCapture: any;
  options: CameraOptions = {
    quality: 80,
    allowEdit: false,
    sourceType: 1,
    saveToPhotoAlbum: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
  constructor(
    private camera: Camera,
    private readonly toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this.srcImg) {
      this.srcImgCapture = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpeg;base64,' + this.srcImg
      );
    }
  }

  async takePhoto(): Promise<void> {
    try {
      this.srcImgCapture = '';
      const result = await this.camera.getPicture(this.options);
      await this.loadingService.initLoading('Obteniendo imagen');
      this.srcImgCapture = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpeg;base64,' + result
      );
      this.dataPhoto.emit(
        this.srcImgCapture?.changingThisBreaksApplicationSecurity || result
      );
      this.cd.detectChanges();
      await this.loadingService.endLoading();
    } catch (error) {
      if (error === 'No Image Selected') {
        return;
      }
      await this.toastrService.createToast(
        'Ocurrió un error capturando la foto',
        'warning'
      );
    }
  }
}
