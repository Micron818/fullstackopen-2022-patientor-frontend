import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Male, Female, Transgender } from '@mui/icons-material';
import { setPatient, setPatientArr, useStateValue } from '../state';
import { Entries } from './Entries';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientArr }, dispatch] = useStateValue();
  const [{ patient }] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) throw new Error('id undefined!');
        const existedPatient = patientArr.find((v) => v.id === id);
        if (existedPatient) dispatch(setPatient(existedPatient));
        else {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(data));
          dispatch(setPatientArr(patientArr.concat(data)));
        }
      } catch (error) {
        console.log(error);
      }
    };
    void fetchPatient();
  }, [dispatch, id, patientArr]);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Female:
        return <Female />;
      case Gender.Male:
        return <Male />;
      default:
        return <Transgender />;
    }
  };

  return (
    <>
      <Typography variant="h5">
        {patient.name}
        {getGenderIcon(patient.gender)}
      </Typography>
      <Typography>ssn:{patient.ssn}</Typography>
      <Typography>occupation:{patient.occupation}</Typography>
      <Entries />
    </>
  );
};

export default PatientPage;
