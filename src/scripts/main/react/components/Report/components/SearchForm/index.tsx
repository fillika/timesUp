import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';
import { reportsAPI } from 'Api/reports';
import { getJWTToken } from 'Utils/helpers/JWTHadlers';
import { parseDate } from './utils';
import { DayVariable, InitialValues } from './types';

export type SearchFormikProps = {
  formik: FormikProps<{
    name: string;
    date: DayVariable;
  }>;
};

export const SearchForm = () => {
  const initialValues: InitialValues = {
    name: '',
    date: 'Today',
  };

  const token = getJWTToken();

  const submitHadlers = async (values: typeof initialValues) => {
    const params = {
      name: values.name,
      ...parseDate(values.date),
    };

    if (token) {
      await reportsAPI
        .getReports(token, params)
        .then(response => console.log(response))
        .catch(err => console.error(`Some err: ${err}`));
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().min(1, 'Must be 1 character or more').required(),
        })}
        onSubmit={submitHadlers}>
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <InputComponent formik={formik} />
            <SelectComponent formik={formik} />
          </form>
        )}
      </Formik>
    </div>
  );
};
