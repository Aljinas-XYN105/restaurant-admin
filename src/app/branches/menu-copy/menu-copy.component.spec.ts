import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCopyComponent } from './menu-copy.component';

describe('MenuCopyComponent', () => {
  let component: MenuCopyComponent;
  let fixture: ComponentFixture<MenuCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
