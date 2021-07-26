import React from 'react';
import { ErrorMessage } from 'formik';

export const FormikError: React.FC<{ formikKey: string }> = ({ formikKey }) => {
  return (
    <div className='form__error'>
      <ErrorMessage name={formikKey} />
    </div>
  );
};
