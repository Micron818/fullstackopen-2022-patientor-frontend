export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class Patient {
  id = '';
  name = '';
  occupation = '';
  gender: Gender = Gender.Female;
  ssn?: string;
  dateOfBirth?: string;
}
