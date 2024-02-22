import { Component, Input } from '@angular/core';
import { Medication } from '../../models/medication.model';
import { MedicationService } from '../../services/medication.service';

@Component({
  selector: 'app-medication-table',
  standalone: true,
  imports: [],
  templateUrl: './medication-table.component.html',
  styleUrl: './medication-table.component.scss',
})
export class MedicationTableComponent {
  @Input()
  daysCount: number[] | undefined;

  @Input()
  medications: Medication[][] | undefined;

  constructor(private medicationService: MedicationService) {}

  protected getMedications(medication: Medication[]): Medication[] {
    return [...Array.from(medication)];
  }

  protected onChange(
    event: Event,
    medicationId: string,
    time: 'morning' | 'afternoon' | 'evening',
    day: number,
  ) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const medicationDays = this.medications?.find((med) =>
      med.find(({ id }) => id === medicationId),
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
