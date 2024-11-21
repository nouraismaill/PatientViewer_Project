import { Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { NoAppointmentComponent } from './no-appointment/no-appointment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: NoAppointmentComponent,
    title: 'No Appointment selected',
  },
  {
    path: 'profile/:patientId',
    component: ProfileComponent,
    title: 'Profile',
    children: [
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
