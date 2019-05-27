import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-font-weight",
  templateUrl: "./font-weight.component.html",
  styleUrls: ["./font-weight.component.scss"]
})
export class FontWeightComponent implements OnInit, OnChanges {
  public fontWeightForm: FormGroup;

  constructor() {
    this.fontWeightForm = new FormGroup({
      fontWeight: new FormControl("")
    });
  }

  @Input()
  public weight: string;

  @Input()
  public label: string = "";

  @Output()
  public weightChanges: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.fontWeightForm.valueChanges.subscribe((formValues: any) => {
      this.weightChanges.next(formValues.fontWeight);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.weight && this.fontWeightForm) {
      this.fontWeightForm.patchValue(
        {
          fontWeight: changes.weight.currentValue
        },
        {
          emitEvent: false
        }
      );
    }
  }
}
