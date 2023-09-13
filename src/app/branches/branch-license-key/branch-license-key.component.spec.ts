import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLicenseKeyComponent } from './branch-license-key.component';

describe('BranchLicenseKeyComponent', () => {
  let component: BranchLicenseKeyComponent;
  let fixture: ComponentFixture<BranchLicenseKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchLicenseKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchLicenseKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
