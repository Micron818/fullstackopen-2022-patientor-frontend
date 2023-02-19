import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import {
  DiagnosesSelection,
  NumberField,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

import { EntryTypeEnum } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  // onSubmit: (values: EntryWithoutId) => void;
  onSubmit: () => void;
  error?: string;
}

const typeOptions = Object.entries(EntryTypeEnum).map((v) => ({
  value: v[0],
  label: v[1],
}));

const AddEntryForm = ({ open, onClose, onSubmit, error }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const today = new Date().toISOString().substring(0, 10);
  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        date: today,
        specialist: '',
        diagnosisCodes: [],
        description: '',
        discharge: {
          date: today,
          criteria: '',
        },
        healthCheckRating: 1,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Dialog
            fullWidth={true}
            open={open}
            onSubmit={onSubmit}
            onClose={() => onClose()}
          >
            <DialogTitle>Add a new patient</DialogTitle>
            <Divider />
            <DialogContent>
              {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
              <Form className="form ui">
                <SelectField label="Type" name="type" options={typeOptions} />
                <Field label="Date" name="date" component={TextField} />
                <Field
                  label="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Description"
                  name="description"
                  component={TextField}
                />
                <DiagnosesSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                {/* just visible whne type HealthCheck */}
                {values.type === 'HealthCheck' && (
                  <Field
                    label="HealthCheckRating"
                    name="healthCheckRating"
                    min={0}
                    max={3}
                    // min={HealthCheckRating.Healthy}
                    // max={HealthCheckRating.CriticalRisk}
                    component={NumberField}
                  />
                )}
                {/* just visible when type OccupationalHealthcare */}
                {values.type === 'OccupationalHealthcare' && (
                  <Field
                    label="EmployerName"
                    name="employerName"
                    component={TextField}
                  />
                )}
                {values.type === 'OccupationalHealthcare' && (
                  <Field
                    label="SickLeave"
                    name="sickLeave"
                    component={TextField}
                  />
                )}
                {/* just visible when type Hospital */}
                {values.type === 'Hospital' && (
                  <Container>
                    <Typography
                      variant="subtitle2"
                      color="grey.500"
                      gutterBottom={true}
                    >
                      Discharge
                    </Typography>
                    <Field
                      label="Date"
                      name="discharge.date"
                      component={TextField}
                    />
                    <Field
                      label="Criteria"
                      name="discharge.criteria"
                      component={TextField}
                    />
                  </Container>
                )}

                <Grid>
                  <Grid>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: 'left' }}
                      type="button"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      style={{
                        float: 'right',
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </DialogContent>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export { AddEntryForm };
