import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationByDateComponent } from './medication-by-date.component';

describe('MedicationByDateComponent', () => {
  let component: MedicationByDateComponent;
  let fixture: ComponentFixture<MedicationByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationByDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicationByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
