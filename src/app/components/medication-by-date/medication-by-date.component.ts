import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Medication } from '../../models/medication.model';
import { MedicationService } from '../../services/medication.service';
import { concat, defer, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-medication-by-date',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './medication-by-date.component.html',
  styleUrl: './medication-by-date.component.scss',
})
export class MedicationByDateComponent implements OnInit {
  todayDay = this.medicationService.getTodaysDate();
  selectDate = new FormControl(this.todayDay);

  @Input()
  daysCount: number[] | undefined;

  @Input()
  medications: Medication[][] | undefined;

  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.checkMedicationsBySelectedDate();
  }

  protected checkMedicationsBySelectedDate(): Observable<Medication[]> {
    return concat(
      defer(() => of(this.selectDate.value)),
      this.selectDate.valueChanges,
    ).pipe(
      map((date: number | null) =>
        this.medications?.length && date
          ? this.medications.map((med) => med[date - 1]).filter(Boolean)
          : [],
      ),
    );
  }

  protected onChange(
    event: Event,
    medicationId: string,
    time: 'morning' | 'afternoon' | 'evening',
    day?: number | null,
  ) {
    if (!day) return;
    const selectedDay = day - 1;
    const isChecked = (event.target as HTMLInputElement).checked;
    const medicationDays = this.medications?.find((med) =>
      med.find(({ id }) => id === medicationId),
    );
    const medication = medicationDays && medicationDays[selectedDay];
    const updatedMedication = {
      ...medication,
      [time]: isChecked,
    } as Medication;
    this.medicationService.updateMedication(selectedDay, updatedMedication);
  }
}
