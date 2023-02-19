import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { apiBaseUrl } from '../constants';
import { setPatient, setPatientArr, useStateValue } from '../state';
import { EntryBody, Entry } from '../types';
import { AddEntryForm } from './AddEntryForm';
import { EntryDetails } from './EntryDetails';

export const Entries = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  const [{ patient, patientArr }, dispatch] = useStateValue();

  const onNewEntrySubmit = async (values: EntryBody) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(newEntry),
      };

      dispatch(setPatient(updatedPatient));

      const updatedPatientArr = patientArr.map((value) =>
        value.id === updatedPatient.id ? updatedPatient : value
      );

      dispatch(setPatientArr(updatedPatientArr));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }

    onNewEntryClose();
  };
  const onNewEntryClose = () => {
    setOpen(false);
    setError(undefined);
  };
  return (
    <>
      <Typography variant="h5" paddingTop="1em">
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        ADD NEW ENTRY
      </Button>
      <AddEntryForm
        open={open}
        onSubmit={onNewEntrySubmit}
        error={error}
        onClose={onNewEntryClose}
      />
    </>
  );
};
