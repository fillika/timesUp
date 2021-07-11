import React from 'react';
import { Formik, Form, FormikConfig, Field, ErrorMessage, FormikHelpers } from 'formik';

// type InitialValues = {
//   [key: string]: string;
// };
export type InitialValues = {
  name?: string,
  email?: string,
  tel?: string,
  password?: string,
  passwordConfirm?: string,
};

// * Очень спорное решение. По итогу конфиг становится any. Основной конфликт вокруг onSubmit
// Todo пофиксить конфликт для onSubmit
// type Config = {
//   [key in keyof FormikConfig<InitialValues>]: FormikConfig<InitialValues>[keyof FormikConfig<InitialValues>];
// };
interface Config extends FormikConfig<InitialValues> {
  onSubmit: (values: any, formikHelpers: any) => void | Promise<any>;
}

type formikKeyType = keyof InitialValues;

type Data = {
  labels: {
    [key in keyof InitialValues]: string;
  };
  types: {
    [key in keyof InitialValues]: string;
  };
};

export const FormikError: React.FC<{ formikKey: string }> = ({ formikKey }) => {
  return (
    <div className='form__error'>
      <ErrorMessage name={formikKey} />
    </div>
  );
};

type FormikWrapper = {
  children: React.ReactNode;
  config: Config;
  data: Data;
};

export const FormikWrapper: React.FC<FormikWrapper> = ({ children, config, data }) => {
  return (
    <Formik {...config}>
      {formik => (
        <Form onSubmit={formik.handleSubmit} className='form'>
          {Object.keys(formik.values).map(formikKey => {
            const type = data.types[formikKey as formikKeyType];
            const labelText = data.labels[formikKey as formikKeyType];

            return (
              <div
                key={formikKey}
                className={`form__fields-wrapper ${formik.errors[formikKey as formikKeyType] ? 'error' : ''}`}>
                <Field type={type} name={formikKey} id={formikKey} />
                <label htmlFor={formikKey}>{labelText}</label>
                {formik.errors[formikKey as formikKeyType] ? <FormikError formikKey={formikKey} /> : null}
              </div>
            );
          })}

          {children}
        </Form>
      )}
    </Formik>
  );
};
