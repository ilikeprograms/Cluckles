import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MockAppHeaderComponent } from 'test/mock/components/app-header.component.mock';
import { MockClrVerticalNavComponent } from 'test/mock/clarity/clr-vertical-nav.component.mock';
import { MockClrIconComponent } from 'test/mock/clarity/clr-icon.component.mock';
import { MockClrVerticalNavGroupChildrenComponent } from 'test/mock/clarity/clr-vertical-nav-group-children.component.mock';
import { MockClrVerticalNavGroupComponent } from 'test/mock/clarity/clr-vertical-nav-group.component.mock';
import { MockClrMainContainerComponent } from 'test/mock/clarity/clr-main-container.component.mock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockClrMainContainerComponent,
        MockClrIconComponent,
        MockClrVerticalNavComponent,
        MockClrVerticalNavGroupChildrenComponent,
        MockClrVerticalNavGroupComponent,
        MockAppHeaderComponent
      ],
    }).compileComponents();
  }));

  it('should match snapshot', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
