import { MedicationService } from '../../services/medication.service';
import { Component } from '@angular/core';
import { Medication } from '../../models/medication.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medication-add',
  templateUrl: './medication-add.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class MedicationAddComponent {
  newMedication: Medication = {
    name: '',
    morning: false,
    afternoon: false,
    evening: false,
    id: '',
  };

  constructor(private medicationService: MedicationService) {}

  addMedication(): void {
    if (this.newMedication.name.trim() !== '') {
      this.medicationService
        .saveMedication(
          this.medicationService.selectedMonth,
          this.newMedication,
        )
        .then(() => {
          this.newMedication = {
            name: '',
            morning: false,
            afternoon: false,
            evening: false,
            id: '',
          };
        })
        .catch((error) => {
          console.error('Error adding medication:', error);
        });
    }
  }
}
