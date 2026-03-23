import React from 'react';
import './auth.css';
import TextLogo from '../../../../assets/old_images/digikala.svg';
import LogoWithText from '../../../../assets/old_images/digikala.svg';
import useForgotPassword from './useForgotPassword';
import FormField from '../../../Common/form/FormField';
import CustomButton from '../../../Common/custombutton/CustomButton';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const { formMethods, loading, onSubmit } = useForgotPassword();
  const {
    register,
    formState: { errors },
  } = formMethods;

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
              <h1>Enter your email to reset your password</h1>
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
                  placeholder="john@acme.com"
                  required
                  register={register('email')}
                  error={errors.email?.message}
                />
                <div className="full-width">
                  <CustomButton
                    label={loading ? "Processing..." : "Proceed"}
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

export default ForgotPassword;
