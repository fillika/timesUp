import React, { useEffect } from 'react';
import { useGreetingsState } from './hooks/useGreetingsState';
import { useFormikConfig } from './hooks/useFormikConfig';

const FormErrorMessage: React.FC<{ error: string | undefined }> = ({ error }) => {
  return <>{error ? <div className='form__error'>{error}</div> : null}</>;
};

const Greetings = () => {
  const [isRegister, isInputHiding, onSubmit, toggleRegister] = useGreetingsState();
  const formik = useFormikConfig(onSubmit);

  useEffect(() => {
    if (!isRegister) {
      formik.values.name = '';
      formik.values.passwordConfirm = '';
    }

  }, [isRegister]);

  return (
    <div className='greetings'>
      <div onClick={toggleRegister} className='greetings__toggle'>
        {!isRegister ? 'Регистрация' : 'Вход'}
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className='form'>
          {isRegister && (
            <div className={`form__fields-wrapper ${isInputHiding ? 'form__fields-wrapper--hide' : ''}`}>
              <input
                type='text'
                name='name'
                id='username'
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
              <label htmlFor='username'>Username</label>

              <FormErrorMessage error={formik.errors.name} />
            </div>
          )}

          <div className='form__fields-wrapper'>
            <input
              type='email'
              name='email'
              id='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            <label htmlFor='email'>Email</label>

            <FormErrorMessage error={formik.errors.email} />
          </div>

          <div className='form__fields-wrapper'>
            <input
              type='password'
              name='password'
              id='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <label htmlFor='password'>Password</label>

            <FormErrorMessage error={formik.errors.password} />
          </div>
          {isRegister && (
            <div className={`form__fields-wrapper ${isInputHiding ? 'form__fields-wrapper--hide' : ''}`}>
              <input
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                required
              />
              <label htmlFor='passwordConfirm'>Confirm password</label>

              <FormErrorMessage error={formik.errors.passwordConfirm} />
            </div>
          )}

          <div className='form__button-wrapper'>
            <button className={`button button--${isRegister ? 'primary' : 'success'}`} type='submit'>
              {isRegister ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greetings;
