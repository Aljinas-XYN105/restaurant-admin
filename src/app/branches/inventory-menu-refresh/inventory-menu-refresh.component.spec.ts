import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMenuRefreshComponent } from './inventory-menu-refresh.component';

describe('InventoryMenuRefreshComponent', () => {
  let component: InventoryMenuRefreshComponent;
  let fixture: ComponentFixture<InventoryMenuRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMenuRefreshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMenuRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
