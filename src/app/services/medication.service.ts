import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Medication } from '../models/medication.model';
import moment from 'moment';
import 'moment/locale/uk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  months!: string[];
  year!: number;
  selectedMonth = this.getDefaultMonth();
  month$ = new BehaviorSubject<number>(this.getDefaultMonth());
  constructor(private db: AngularFireDatabase) {
    moment.locale('uk');
    this.months = moment.months();
    this.year = moment().year();
  }

  getRandomId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getDefaultMonth(): number {
    return moment().month();
  }

  getMonthsNames(): string[] {
    return moment.months().map((value) => {
      const month: string[] = value.split('');
      month[0] = month[0].toUpperCase();
      return month.join('');
    });
  }

  getMedications(month: number): Observable<Medication[][]> {
    return this.db
      .list<Medication[]>(`${environment.apiUrl}/${this.year}/${month}`)
      .valueChanges();
  }

  saveMedication(month: number, medication: Medication): Promise<void> {
    medication = { ...medication, id: this.getRandomId() };
    return this.db
      .object(`${environment.apiUrl}/${this.year}/${month}/${medication.name}`)
      .set(
        Array.from(
          {
            length: moment(
              `${this.year}-${(month + 1).toString().padStart(2, '0')}`,
            ).daysInMonth(),
          },
          () => {
            medication = { ...medication, id: this.getRandomId() };
            return medication;
          },
        ),
      );
  }

  updateMedication(day: number, medication: Medication) {
    return this.db
      .object(
        `${environment.apiUrl}/${this.year}/${this.selectedMonth}/${medication.name}/${day}`,
      )
      .update(medication);
  }

  onMonthChange(monthNumber: number): void {
    this.selectedMonth = monthNumber;
    this.month$.next(monthNumber);
  }

  getSelectedMonth(): number {
    return this.selectedMonth;
  }
}
