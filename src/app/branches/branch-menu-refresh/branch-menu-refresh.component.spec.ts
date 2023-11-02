import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMenuRefreshComponent } from './branch-menu-refresh.component';

describe('BranchMenuRefreshComponent', () => {
  let component: BranchMenuRefreshComponent;
  let fixture: ComponentFixture<BranchMenuRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchMenuRefreshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchMenuRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
