import { StringTransformService } from './../../core/services/string-transform.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

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
  @Input() typeInput: 'text' | 'password' | 'number';
  @Input() deleteBtn: boolean;
  @Input() isCurrency: boolean;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly stringTransformService: StringTransformService
  ) {}

  ngOnInit(): void {
    if (!this.value || this.value === '0') {
      this.value = '';
    }
  }

  ngOnDestroy(): void {}

  handleDelete() {
    this.inputDelete.emit();
  }

  handleInput(event: any): void {
    let value = this.stringTransformService.removeSpecialCharacters(
      `${event?.target?.value}`
    );
    if (this.isCurrency) {
      const format = Number(value).toLocaleString('es-CO');
      value = `${format}`;
    }
    this.value = `${value}`;
    this.inputChange.emit(`${value}`);
  }
}
