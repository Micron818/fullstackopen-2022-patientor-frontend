import { State } from './state';
import { Diagnoses, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT_ARR';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnoses[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT_ARR':
      return { ...state, patientArr: state.patientArr.concat(action.payload) };
    case 'SET_DIAGNOSES':
      return { ...state, diagnoses: state.diagnoses.concat(action.payload) };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST' as const,
    payload: patientList,
  };
};

export const setPatientArr = (patient: Patient) => {
  return {
    type: 'SET_PATIENT_ARR' as const,
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Diagnoses[]) => {
  return {
    type: 'SET_DIAGNOSES' as const,
    payload: diagnoses,
  };
};
