import React from 'react';
import './auth.css';

import TextLogo from '../../../../assets/old_images/digikala.svg';
import LogoWithText from '../../../../assets/old_images/digikala.svg';

import useLogin from './useLogin';
import FormField from '../../../Common/form/FormField';
import CustomButton from '../../../Common/custombutton/CustomButton';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { formMethods, loading, onSubmit } = useLogin();
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <section className="log-Reg-Wrap">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Side Logo and Info */}
        <div className="logoReg-Bg">
          <div className="log-reg-lt">
            <div className="log-reg-info-lt">
              <h3>Welcome to</h3>
              <div className="text-logo">
                <img src={TextLogo} alt="Logo" />
              </div>
              <p>
                Effortlessly manage hiring, track applications, and connect with top teaching
                talent—all in one place.
              </p>
            </div>
          </div>
        </div>
        {/* Right Side Login Form */}
        <div className="logright-content">
          <div className="log-Reg-Right w-full">
            <div className="logo-log-Reg">
              <img src={LogoWithText} alt="Logo" />
              <p>Smart Hiring Made Simple - Find, Vet and Hire Top Educators with Ease!</p>
            </div>
            <div className="heading-block">
              <h1>Login</h1>
              <p>
                Manage hiring, track applications, and connect <br />
                with top educators effortlessly.
              </p>
            </div>
            <div className="form-main">
              <form onSubmit={onSubmit}>
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  register={register('email')}
                  error={errors.email?.message}
                />
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  register={register('password')}
                  error={errors.password?.message}
                />
                <div className="forgot-wrap flex items-center justify-between mb-5">
                  <div className="left-wrap flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      {...register('rememberMe')}
                      className="form-checkbox mr-2"
                    />
                    <label htmlFor="rememberMe" className="text-sm">
                      Remember Me
                    </label>
                  </div>
                  <div className="right-wrap">
                    <Link to={'/forgot-password'}>Forgot Password?</Link>
                  </div>
                </div>
                <div className="full-width">
                  <CustomButton
                    label={loading ? 'Logging in...' : 'Login'}
                    variant="contained"
                    className="btn full-btn"
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="log-copyrht">
            <p>
              ©2026 <Link to={''}>Test</Link>, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
