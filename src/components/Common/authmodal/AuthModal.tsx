// components/AuthModal.tsx
import './authmodal.css';
import { Dialog, DialogContent } from '@mui/material';
import CustomButton from '../custombutton/CustomButton';
import cross from '../../../assets/images/soumya-images/modal-cross.svg';

interface AuthModalProps {
  open: boolean;
  handleClose?: () => void;
  keyicon: string;
  title?: string;
  highlightMessage?: string;
  description?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonClass?: string;
  secondaryButtonClass?: string;
  crossBtn?: boolean;
}

function AuthModal({
  open,
  handleClose,
  keyicon,
  title = 'Congratulations!',
  highlightMessage = 'Password Changed Successfully!',
  description = 'Your password has been updated. You can now log in with your new credentials.',
  buttonText = 'Log In to your Account',
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonClass,
  secondaryButtonClass,
  crossBtn = true,
}: AuthModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="authmodal"
    >
      <DialogContent>
        <div className="authmodal-section">
          <div className="icon-box">
            <img src={keyicon} alt="key icon" />
          </div>
          <div className="content-holder">
            <h1>{title}</h1>
            <p className="highlight">{highlightMessage}</p>
            <p>{description}</p>
            <div className="button-holder">
              <CustomButton
                label={buttonText}
                variant="contained"
                className={primaryButtonClass || 'btn'}
                type="button"
                onClick={onPrimaryClick}
              />
              {secondaryButtonText && (
                <CustomButton
                  label={secondaryButtonText}
                  variant="outlined"
                  className={secondaryButtonClass || 'btn secondary'}
                  onClick={onSecondaryClick}
                />
              )}
            </div>
          </div>
        </div>
        {crossBtn && (
          <div className="close-icon" onClick={handleClose}>
            <img src={cross} alt="close" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
