import React from 'react';
import './auth.css';
import TextLogo from '../../../../assets/old_images/digikala.svg';
import LogoWithText from '../../../../assets/old_images/digikala.svg';
import useResetPassword from './useResetPassword';
import FormField from '../../../Common/form/FormField';
import CustomButton from '../../../Common/custombutton/CustomButton';
import { Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const { formMethods, loading, onSubmit, resetToken } = useResetPassword();
  const {
    register,
    formState: { errors },
  } = formMethods;

  if (!resetToken) {

    // return (
    //   <div className="flex items-center justify-center min-h-screen">
    //     <div className="text-center">
    //       <h1 className="text-2xl font-bold text-red-500">Invalid or Missing Token</h1>
    //       <p className="mt-2 text-gray-600">Please use the link sent to your email.</p>
    //       <Link to="/login" className="mt-4 inline-block text-blue-500 underline">Go to Login</Link>
    //     </div>
    //   </div>
    // );
  }

  return (
    <section className="log-Reg-Wrap">
      <div className="grid grid-cols-2 gap-4">
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
        <div className="logright-content">
          <div className="log-Reg-Right w-full">
            <div className="logo-log-Reg">
              <img src={LogoWithText} alt="Logo" />
              <p>Smart Hiring Made Simple - Find, Vet and Hire Top Educators with Ease!</p>
            </div>
            <div className="heading-block">
              <h1>Reset Password</h1>
              <p>
                Manage hiring, track applications, and connect <br />
                with top educators effortlessly.
              </p>
            </div>
            <div className="form-main">
              <form onSubmit={onSubmit}>
                <FormField
                  label="New Password"
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  register={register('password')}
                  error={errors.password?.message}
                />

                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  required
                  register={register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                <div className="full-width">
                  <CustomButton
                    label={loading ? "Resetting..." : "Reset Password"}
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
              ©2025 <Link to={''}>Test</Link>, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
