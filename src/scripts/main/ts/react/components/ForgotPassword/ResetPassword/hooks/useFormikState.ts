import * as Yup from 'yup';

type FormikValues = {
  email: string;
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
    email: '',
  };

  const data: FormikData = {
    labels: {
      email: 'Email',
    },
    types: {
      email: 'email',
    },
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return [initialValues, validationSchema, data, onSubmit];
};
