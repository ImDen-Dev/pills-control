import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { MedicationListComponent } from './components/medication-list/medication-list.component';
import { MedicationAddComponent } from './components/medication-add/medication-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MonthPickerComponent,
    MedicationListComponent,
    MedicationAddComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pills-control-app';
  isShowNav = false;
  isShowTable = false;

  showTableMod(event: Event): void {
    this.isShowTable = (event.target as HTMLInputElement).checked;
  }
}
