export interface Patients {
  id: string;
  name: string;
  age: number;
  contact: number;
  appointments: Appointment[];
  medicalHistory: MedicalHistory[];
}
export interface Appointment {
  date: string;
  doctor: string;
  notes: string;
}

export interface MedicalHistory {
  date: string;
  doctor: string;
}
