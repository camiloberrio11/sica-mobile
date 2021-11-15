import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptureReaderNfcComponent } from './capture-reader-nfc.component';

describe('CaptureReaderNfcComponent', () => {
  let component: CaptureReaderNfcComponent;
  let fixture: ComponentFixture<CaptureReaderNfcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureReaderNfcComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptureReaderNfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
