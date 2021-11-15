import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  Inject,
  OnDestroy,
} from '@angular/core';
import { StringTransformService } from 'src/app/core/services/string-transform.service';

@Component({
  selector: 'app-input-general',
  templateUrl: './input-general.component.html',
  styleUrls: ['./input-general.component.scss'],
})
export class InputGeneralComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disable: boolean;
  @Input() isTypeDate: boolean;
  @Input() srcIcon: string;
  @Input() typeInput: 'text' | 'password';

  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stringTransformService: StringTransformService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  handleInput(event: any): void {
    let value = event?.target?.value;
    if (this.isTypeDate) {
      value = this.stringTransformService.formatDate(event?.target?.value);
    }
    this.inputChange.emit(value);
  }
}
