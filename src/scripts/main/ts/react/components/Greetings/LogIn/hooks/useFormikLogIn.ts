import * as Yup from 'yup';

export type LogInValues = {
  email: string;
  password: string;
};

export type formikKeyType = keyof LogInValues;

export const useFormikLogIn = (): [LogInValues, any] => {
  const initialValues: LogInValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
  });

  return [initialValues, validationSchema];
};
