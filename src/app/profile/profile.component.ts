import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PatientService } from '../patients/patient.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent implements OnInit {
  patientName = '';

  private patientService = inject(PatientService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const patientId = paramMap.get('patientId');
        if (patientId) {
          this.patientService.getAllPatients().subscribe({
            next: (patients) => {
              const patient = patients.find((u) => u.id === patientId);
              this.patientName = patient?.name || 'Unknown Patient';
            },
            error: (error) => {
              console.error('Error fetching patients:', error);
            },
          });
        }
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
