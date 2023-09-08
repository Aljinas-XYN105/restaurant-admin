import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterLogoUploadComponent } from './printer-logo-upload.component';

describe('PrinterLogoUploadComponent', () => {
  let component: PrinterLogoUploadComponent;
  let fixture: ComponentFixture<PrinterLogoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinterLogoUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinterLogoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
