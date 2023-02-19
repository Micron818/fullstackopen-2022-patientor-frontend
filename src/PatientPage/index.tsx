import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Male, Female, Transgender } from '@mui/icons-material';
import { setPatientArr, useStateValue } from '../state';
import { Entries } from './Entries';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientArr }, dispatch] = useStateValue();
  const [patient, setPatient] = useState(new Patient());

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) throw new Error('id undefined!');
        const existedPatient = patientArr.find((v) => v.id === id);
        if (existedPatient) {
          setPatient(existedPatient);
        } else {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          setPatient(patient);
          dispatch(setPatientArr(patient));
        }
      } catch (error) {
        console.log(error);
      }
    };
    void fetchPatient();
  }, [dispatch]);

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
      <Entries patient={patient} setPatient={setPatient} />
    </>
  );
};

export default PatientPage;
