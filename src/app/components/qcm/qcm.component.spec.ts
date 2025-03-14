import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCMComponent } from './qcm.component';

describe('QCMComponent', () => {
  let component: QCMComponent;
  let fixture: ComponentFixture<QCMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QCMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
