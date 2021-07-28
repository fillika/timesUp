import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';
import { getJWTToken } from 'Utils/helpers/JWTHadlers';
import { parseDate } from './utils';
import { DayVariable, InitialValues } from './types';
import { getReportResult } from 'Redux/reducers/reportReducer/middlewares';

export type SearchFormikProps = {
  formik: FormikProps<{
    name: string;
    date: DayVariable;
  }>;
};

export const SearchForm = () => {
  const token = getJWTToken();
  const dispatch = useDispatch();

  const initialValues: InitialValues = {
    name: '',
    date: 'Today',
  };

  const submitHadlers = async (values: typeof initialValues) => {
    const params = {
      name: values.name,
      ...parseDate(values.date),
    };

    if (token) dispatch(getReportResult(token, params));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().min(3, 'Must be 3 characters or more').required('Task name is a required field'),
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
