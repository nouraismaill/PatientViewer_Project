import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { PatientsComponent } from './patients/patients.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PatientsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
