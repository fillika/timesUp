import * as Yup from 'yup';

export type LogInValues = {
  email: string;
  password: string;
};

export type formikKeyType = keyof LogInValues;

export type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

export const useFormikLogIn = (): [LogInValues, any, FormikData] => {
  const initialValues: LogInValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
  });

  const data = {
    labels: {
      name: 'Username',
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },
    types: {
      name: 'text',
      email: 'email',
      password: 'password',
      passwordConfirm: 'password',
    },
  };

  return [initialValues, validationSchema, data];
};
