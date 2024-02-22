import { MedicationService } from '../../services/medication.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { switchMap } from 'rxjs';
import { Medication } from '../../models/medication.model';
import { MedicationAddComponent } from '../medication-add/medication-add.component';
import { MedicationTableComponent } from '../medication-table/medication-table.component';
import { MedicationByDateComponent } from '../medication-by-date/medication-by-date.component';

@Component({
  selector: 'app-medication-list',
  templateUrl: 'medication-list.component.html',
  standalone: true,
  imports: [
    MedicationAddComponent,
    MedicationTableComponent,
    MedicationByDateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationListComponent implements OnInit {
  medicationsAll: Medication[][] | undefined;
  daysCount: number[] | undefined;

  @Input()
  tableMod = false;

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
          this.medicationsAll = value;
          this.cdr.detectChanges();
        },
      });
  }
}
