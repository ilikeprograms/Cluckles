import {
  Component,
  EventEmitter,
  Input,
  SimpleChanges,
  Output
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-unit',
  templateUrl: './text-unit.component.html'
})
export class TextUnitComponent {
  public textUnitForm: FormGroup;

  @Input()
  public value: string;

  @Input()
  public label: string = '';

  @Output()
  public valueChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.textUnitForm = new FormGroup({
      textValue: new FormControl('')
    });
  }

  public ngOnInit(): void {
    this.textUnitForm.valueChanges.subscribe(
      (formValues: { textValue: string }) => {
        this.valueChanged.next(formValues.textValue);
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.value && this.textUnitForm) {
      this.textUnitForm.patchValue(
        {
          textValue: changes.value.currentValue
        },
        {
          emitEvent: false
        }
      );
    }
  }
}
