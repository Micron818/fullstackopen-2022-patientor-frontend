export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface EntryBody {
  type: EntryTypeEnum;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: SickLeave;
  discharge?: Discharge;
}

// export interface Patient {
//   id: string;
//   name: string;
//   ssn: string;
//   occupation: string;
//   gender: Gender;
//   dateOfBirth: string;
//   entries: Entry[];
// }

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export class Patient {
  id = '';
  name = '';
  occupation = '';
  gender: Gender = Gender.Female;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[] = [];
}

export enum EntryTypeEnum {
  'HealthCheck' = 'HealthCheck',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
  'Hospital' = 'Hospital',
}
