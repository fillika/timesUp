import React, { useState, ChangeEvent } from 'react';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const SearchForm = () => {
  return (
    <div>
      <Formik
        initialValues={{ nameOfTask: '', date: 'Today' }}
        validationSchema={Yup.object({
          nameOfTask: Yup.string().min(1, 'Must be 1 character or more').required(),
        })}
        onSubmit={values => console.log(values)}>
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
