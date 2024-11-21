import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Patients } from './patient.model';
import { PatientService } from './patient.service';
import { PatientComponent } from './patient/patient.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PatientComponent, FormsModule],
  templateUrl: './patients.component.html',
  styles: ``,
})
export class PatientsComponent implements OnInit {
  patients = signal<Patients[]>([]); // Original list of patients

  isFetching = signal(false);
  error = signal('');

  private destroyRef = inject(DestroyRef);
  private patientService = inject(PatientService);

  ngOnInit() {
    this.isFetching.set(true);

    const subscription = this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients.set(patients);
      },
      error: (error) => {
        console.error(error);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
