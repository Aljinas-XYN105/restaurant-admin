import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyMenuModifiersComponent } from './copy-menu-modifiers.component';

describe('CopyMenuModifiersComponent', () => {
  let component: CopyMenuModifiersComponent;
  let fixture: ComponentFixture<CopyMenuModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyMenuModifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyMenuModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
