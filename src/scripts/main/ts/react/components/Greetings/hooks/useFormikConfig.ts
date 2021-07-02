import { useFormik } from 'formik';

type FormikValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

type FormikErrors = {
  [key: string]: string;
};

const validate = (values: FormikValues) => {
  const errors: FormikErrors = {};
  console.log(values);

  const { name, email, password, passwordConfirm } = values;

  if (name && name === '') {
    errors.name = 'Name is required';
  }

  if (password.length < 8) {
    errors.password = 'Password must be 8 char or more';
  }

  if (passwordConfirm && password !== passwordConfirm) {
    errors.passwordConfirm = 'Пароли должны совпадать.';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export const useFormikConfig = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validate,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => console.log("Валидировано"),
  });

  return formik;
};
