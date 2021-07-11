import * as Yup from 'yup';

type FormikValues = {
  password: string;
  passwordConfirm: string;
};

type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

type HookState = [FormikValues, any, FormikData, (values: FormikValues) => void];

export const useFormikState = (): HookState => {
  const initialValues: FormikValues = {
    password: '',
    passwordConfirm: '',
  };

  const data = {
    labels: {
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },
    types: {
      password: 'password',
      passwordConfirm: 'password',
    },
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
      .required('Please, confirm your password'),
  });

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return [initialValues, validationSchema, data, onSubmit];
};
