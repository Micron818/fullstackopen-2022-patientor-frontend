import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Male, Female, Transgender, Circle } from '@mui/icons-material';
import { setPatientArr, useStateValue } from '../state';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import ListItemIcon from '@mui/material/ListItemIcon';

const Entries = (props: { patient: Patient }) => {
  const patient = props.patient;

  const [{ diagnoses }] = useStateValue();

  const getCodeName = (code: string) => {
    return diagnoses.find((diagnose) => diagnose.code === code)?.name ?? '';
  };

  return (
    <>
      <Typography variant="h5" paddingTop="1em">
        entries
      </Typography>
      {patient.entries.map((v) => (
        <Container key={v.id}>
          {v.date}
          {v.description}
          <List>
            {v.diagnosisCodes?.map((code) => (
              <ListItem key={code} disablePadding={true}>
                <ListItemIcon sx={{ minWidth: '1em' }}>
                  <Circle
                    style={{
                      fontSize: '0.5em',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={`${code} ${getCodeName(code)}`} />
              </ListItem>
            ))}
          </List>
        </Container>
      ))}
    </>
  );
};

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
      <Entries patient={patient} />
    </>
  );
};

export default PatientPage;
