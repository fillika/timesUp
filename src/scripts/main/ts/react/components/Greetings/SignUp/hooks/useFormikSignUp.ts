import * as Yup from 'yup';

export type FormikSignUpValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type formikKeyType = keyof FormikSignUpValues;

export type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

export const useFormikSignUp = (): [FormikSignUpValues, any, FormikData] => {
  const initialValues: FormikSignUpValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

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

  const validationSchema = {
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .min(3, 'Must be 3 characters or less')
      .required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
      .required('Please, confirm your password'),
  };

  return [initialValues, validationSchema, data];
};
