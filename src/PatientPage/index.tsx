import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Male, Female, Transgender } from '@mui/icons-material';
import { useStateValue } from '../state';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const initialSate: Patient = {
    id: '',
    name: '',
    occupation: '',
    gender: Gender.Male,
  };

  // const [patient, setPatient] = useState(initialSate);
  // const [{ patients }, dispatchPatients] = useStateValue();

  const [{ patientDetails }, dispatch] = useStateValue();
  const [patient, setPatient] = useState(initialSate);
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) throw new Error('id undefined!');
        const existedPatient = Object.values(patientDetails).find(
          (v) => v.id === id
        );
        if (existedPatient) {
          setPatient(existedPatient);
        } else {
          const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          setPatient(res.data);
          dispatch({
            type: 'SET_PATIENT',
            payload: Object.values(patientDetails).concat(res.data),
          });
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
    </>
  );
};

export default PatientPage;
