import React from 'react';
import { useParams } from 'react-router-dom';
import { ResetPassword } from './ResetPassword';
import { UpdatePassword } from './UpdatePassword';

export const ForgotPassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div className='formWrapper'>{!id ? <ResetPassword /> : <UpdatePassword />}</div>;
};
