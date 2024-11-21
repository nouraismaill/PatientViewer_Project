import { Component, inject, input } from '@angular/core';

import { TableModule } from 'primeng/table';

import { PatientService } from '../patients/patient.service';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Appointment } from '../patients/patient.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
  patientId = input.required<string>();
  private route = inject(ActivatedRoute);
  private patientService = inject(PatientService);
  patientsAppointments$: Observable<Appointment[]> =
    this.route.parent!.paramMap.pipe(
      switchMap((params) => {
        const patientId = params.get('patientId') ?? ''; // Get patient ID
        console.log('Extracted patientId:', patientId); // Debug log
        return this.patientService.getPatientById(patientId).pipe(
          map((patient) => {
            console.log('Fetched patient:', patient); // Debug log
            return patient.appointments || [];
          })
        );
      })
    );
}
