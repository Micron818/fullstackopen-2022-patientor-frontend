import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Patient } from '../types';
import { AddEntryForm } from './AddEntryForm';
import { EntryDetails } from './EntryDetails';

export const Entries = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  // const onNewEntrySubmit = (values: EntryWithoutId) => {
  const onNewEntrySubmit = () => {
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
