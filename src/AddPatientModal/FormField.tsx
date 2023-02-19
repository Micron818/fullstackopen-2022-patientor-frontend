import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField as TextFieldMUI,
  Typography,
} from '@mui/material';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { useState, useEffect } from 'react';
import { Diagnoses, Gender } from '../types';

// structure of a single option
export type SelectOption = {
  value: Gender | string;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: SelectOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: '0.5em' }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: '1em' }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof field.value === 'number') setValue(field.value);
  }, [field.value]);

  return (
    <div style={{ marginBottom: '1em' }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          if (newValue === undefined) return;
          if (newValue > max) setValue(max);
          else if (newValue <= min) setValue(min);
          else setValue(Math.floor(newValue));
        }}
      />
      <Typography variant="subtitle2" style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosesSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnoses[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = 'diagnosisCodes';
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnoses) => ({
    key: diagnoses.code,
    text: `${diagnoses.name} (${diagnoses.code})`,
    value: diagnoses.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
