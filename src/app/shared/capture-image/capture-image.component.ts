import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.scss'],
})
export class CaptureImageComponent implements OnInit {
  srcImgCapture = '';
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
  constructor(
    private camera: Camera,
    private readonly toastrService: ToastService
  ) {}

  ngOnInit() {}

  async takePhoto(): Promise<void> {
    try {
      const result = await this.camera.getPicture(this.options);
      this.srcImgCapture = `data:image/jpeg;base64,${result}`;
    } catch (error) {
        this.toastrService.createToast(
          'Ocurrió un error capturando la foto',
          'warning'
        );
    }
  }
}
