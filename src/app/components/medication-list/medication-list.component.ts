import { MedicationService } from '../../services/medication.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { switchMap } from 'rxjs';
import { Medication } from '../../models/medication.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MedicationAddComponent } from '../medication-add/medication-add.component';

@Component({
  selector: 'app-medication-list',
  templateUrl: 'medication-list.component.html',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MedicationAddComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationListComponent implements OnInit {
  medications!: Medication[][];
  daysCount!: number[];

  constructor(
    private medicationService: MedicationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    this.medicationService.month$
      .pipe(switchMap((value) => this.medicationService.getMedications(value)))
      .subscribe({
        next: (value) => {
          this.daysCount = Array.from({ length: value[0]?.length });
          this.medications = value;
          this.cdr.detectChanges();
        },
      });
  }

  onChange(
    event: Event,
    medicationName: string,
    time: 'morning' | 'afternoon' | 'evening',
    day: number,
  ) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const medicationDays = this.medications.find((med) =>
      med.find(({ name }) => name === medicationName),
    );
    const medication = medicationDays && medicationDays[day];
    const updatedMedication = {
      ...medication,
      [time]: isChecked,
    } as Medication;
    console.log(updatedMedication);
    this.medicationService.updateMedication(day, updatedMedication);
  }
}
