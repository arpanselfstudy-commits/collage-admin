import React from 'react';
import { Modal, Box, Link } from '@mui/material';
import applicantDisQalifyStat from '../../../assets/images/ic-applicant-disqualify-stat.svg';
import defaultuserIc from '../../../assets/images/ic-user-default.jpg';
import modalCloseIc from '../../../assets/images/ic-modal-close.svg';
import applicantQalifyStat from '../../../assets/images/ic-applicant-qualify-stat.svg';

interface UserProfile {
  name: string;
  status: string;
  jobId: string;
  subject: string;
  interviewDateTime?: string;
  aiScore: string;
  aiRank: string;
  imageUrl?: string;
}

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: UserProfile;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 585,
  bgcolor: 'background.paper',
  border: '0',
  outline: 'none',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({ open, onClose, user }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={modalStyle} className="modal-body relative">
        {/* Close Button */}
        <Link
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
        >
          <img src={modalCloseIc} alt="Close" />
        </Link>

        {/* Profile Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
          <div className="user-ic mx-auto block rounded-full sm:mx-0 sm:shrink-0">
            <img
              className="w-[80px] h-[80px] rounded-full object-cover"
              src={user.imageUrl || defaultuserIc}
              alt="User"
            />
          </div>

          <div className="modal-user-info space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-sm text-blue-600">{user.status}</p>
            <Link href="#" underline="hover" color="primary">
              View Profile
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="profile-modal-info mt-4 space-y-2 text-sm">
          <p>
            <strong>Job ID:</strong> {user.jobId}
          </p>
          <p>
            <strong>Teaching Subject:</strong> {user.subject}
          </p>
          <p>
            <strong>Interview Date - Time:</strong> {user.interviewDateTime || '--'}
          </p>
          <p>
            <strong>AI Match Score:</strong> {user.aiScore}
          </p>
          <p>
            <strong>AI Ranking:</strong> {user.aiRank}
          </p>

          <div className="btn-set flex gap-3 mt-4">
            <Link href="#" className="green-bordered-btn flex items-center gap-2">
              <img src={applicantQalifyStat} alt="Qualify" /> Qualify
            </Link>
            <Link href="#" className="red-bordered-btn flex items-center gap-2">
              <img src={applicantDisQalifyStat} alt="Disqualify" /> Disqualify
            </Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;
