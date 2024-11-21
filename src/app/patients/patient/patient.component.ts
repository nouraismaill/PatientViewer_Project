import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Patients } from '../patient.model';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  styleUrl: './patient.component.css',
  templateUrl: './patient.component.html',
})
export class PatientComponent {
  patient = input.required<Patients>();
}
