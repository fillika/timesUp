import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';
import { reportsAPI } from 'Api/reports';
import { getJWTToken } from 'Utils/helpers/JWTHadlers';

export type SearchFormikProps = {
  formik: FormikProps<{
    name: string;
    date: DayVariable;
  }>;
};

export type DayVariable = 'Today' | 'This week' | 'Last week' | 'This month' | 'Last month' | 'This year' | 'Last year';

const parseDate = (date: DayVariable): { start: number | string; stop: number | string } => {
  // 'Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'
  const [currentDay] = new Date().toISOString().split('T');

  const thisWeek = {
    start: '',
    stop: '',
  };

  switch (date) {
    case 'Today':
      return {
        start: new Date(currentDay).getTime(),
        stop: new Date(currentDay).getTime() + 86400 * 1000,
      };

    default:
      return {
        start: '',
        stop: '',
      };
  }
};

export const SearchForm = () => {
  const initialValues: {
    name: string;
    date: DayVariable;
  } = {
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
