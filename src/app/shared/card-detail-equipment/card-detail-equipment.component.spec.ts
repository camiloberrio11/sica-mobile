import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardDetailEquipmentComponent } from './card-detail-equipment.component';

describe('CardDetailEquipmentComponent', () => {
  let component: CardDetailEquipmentComponent;
  let fixture: ComponentFixture<CardDetailEquipmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailEquipmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetailEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
