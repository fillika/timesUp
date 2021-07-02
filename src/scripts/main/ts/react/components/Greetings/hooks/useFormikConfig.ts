import { useFormik } from 'formik';
import * as Yup from 'yup';

type FormikValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type FormikErrors = {
  [key: string]: string;
};

const validationSchema = {
  name: Yup.string().max(15, 'Must be 15 characters or less').min(3, 'Must be 3 characters or less'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Both password need to be the same'),
};

export const useFormikConfig = (onSubmit: (values: FormikValues) => Promise<void>) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object(validationSchema),
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => onSubmit(values),
  });

  return formik;
};
