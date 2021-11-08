import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-input-general',
  templateUrl: './input-general.component.html',
  styleUrls: ['./input-general.component.scss'],
})
export class InputGeneralComponent implements OnInit, AfterViewInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() srcIcon: string;
  @Input() typeInput: 'text' | 'password';
  @Input() isCodeBarInput: boolean;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('inputgeneral') inputGral: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.isCodeBarInput) {
      this.inputGral.nativeElement.focus();
    }
  }

  ngOnInit() {}

  handleInput(event: any): void {
    this.inputChange.emit(event?.target?.value);
  }
}
