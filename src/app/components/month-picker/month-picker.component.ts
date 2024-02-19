import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MedicationService } from '../../services/medication.service';

@Component({
  selector: 'app-month-picker',
  templateUrl: 'month-picker.component.html',
  standalone: true,
})
export class MonthPickerComponent implements OnInit {
  @Output()
  selectedMonth = new EventEmitter<string>();
  months!: string[];
  currentMonth!: number;

  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.months = this.medicationService.getMonthsNames();
    this.currentMonth = this.medicationService.getDefaultMonth();
  }

  onChangeMonth(event: Event): void {
    const monthNumber = this.months.findIndex(
      (month) => month === (event?.target as HTMLSelectElement)?.value,
    );
    this.medicationService.onMonthChange(monthNumber);
  }
}
