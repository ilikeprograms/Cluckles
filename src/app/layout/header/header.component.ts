import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
}
