import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceFillInTheBlankComponent } from './exercice-fill-in-the-blank.component';

describe('ExerciceFillInTheBlankComponent', () => {
  let component: ExerciceFillInTheBlankComponent;
  let fixture: ComponentFixture<ExerciceFillInTheBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceFillInTheBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciceFillInTheBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
