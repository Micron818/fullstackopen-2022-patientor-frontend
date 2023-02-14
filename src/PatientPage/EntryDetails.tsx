import {
  Diagnoses,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import {
  Medication,
  Work,
  HealthAndSafety,
  Favorite,
  Circle,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useStateValue } from '../state';

const DiagnosCodes = ({
  diagnosisCodes,
}: {
  diagnosisCodes?: Array<Diagnoses['code']>;
}) => {
  const [{ diagnoses }] = useStateValue();

  const getCodeName = (code: string) => {
    return diagnoses.find((diagnose) => diagnose.code === code)?.name ?? '';
  };
  return (
    <List>
      {diagnosisCodes?.map((code) => (
        <ListItem key={code} disablePadding={true}>
          <ListItemIcon sx={{ minWidth: '1em' }}>
            <Circle
              style={{
                fontSize: '0.5em',
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={`${code} ${getCodeName(code)}`}
            sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }}
          />
        </ListItem>
      ))}
    </List>
  );
};

const EntryTypeIcon = ({ type }: { type: Entry['type'] }) => {
  switch (type) {
    case 'Hospital':
      return <Medication />;
    case 'OccupationalHealthcare':
      return <Work />;
    case 'HealthCheck':
      return <HealthAndSafety />;
    default:
      return <>{type}</>;
  }
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => (
  <Box sx={{ border: 2, borderRadius: 1 }}>
    <Typography variant="subtitle1">
      {entry.date}
      <EntryTypeIcon type={entry.type} />
    </Typography>
    <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
      {entry.description}
    </Typography>

    <Typography variant="subtitle2">{`diagnose by ${entry.specialist}`}</Typography>
    <DiagnosCodes diagnosisCodes={entry.diagnosisCodes} />
  </Box>
);

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <Box sx={{ border: 2, borderRadius: 1 }}>
    <Typography>
      {entry.date}
      <EntryTypeIcon type={entry.type} />
      {entry.employerName}
    </Typography>

    <Typography variant="subtitle2">{entry.description} </Typography>
    <Typography variant="subtitle2">
      {`diagnose by ${entry.specialist}`}
    </Typography>
    <DiagnosCodes diagnosisCodes={entry.diagnosisCodes} />
  </Box>
);

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const rating2Color = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        break;
    }
  };
  return (
    <Box sx={{ border: 2, borderRadius: 1 }}>
      <Typography>
        {entry.date}
        <EntryTypeIcon type={entry.type} />
      </Typography>

      <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
        {entry.description}
      </Typography>

      <Favorite sx={{ color: rating2Color(entry.healthCheckRating) }} />

      <Typography variant="subtitle2">{`diagnose by ${entry.specialist}`}</Typography>

      <DiagnosCodes diagnosisCodes={entry.diagnosisCodes} />
    </Box>
  );
};

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      throw new Error('invalid type');
  }
};
