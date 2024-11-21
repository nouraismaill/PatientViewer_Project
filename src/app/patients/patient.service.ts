import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Patients } from './patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private httpClient = inject(HttpClient);

  getAllPatients(): Observable<Patients[]> {
    return this.fetchingPatients('http://localhost:3000/patients');
  }
  getPatientById(patientId: string): Observable<Patients> {
    return this.httpClient
      .get<{ patient: Patients }>(`http://localhost:3000/patient/${patientId}`)
      .pipe(map((response) => response.patient));
  }

  private fetchingPatients(url: string) {
    return this.httpClient.get<{ patients: Patients[] }>(url).pipe(
      map((resData) => resData.patients),

      catchError((error) => {
        console.log('An error occurred while fetching patients:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
