import React, { createContext, useContext, useReducer } from 'react';
import { Patient } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  patientArr:Patient[];
};

const initialState: State = {
  patients: {},
  patientArr:[],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

// export const setPatientList = (patientListFromApi)=>{

//   dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
// }


