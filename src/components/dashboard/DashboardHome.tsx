import React from 'react';
import CustomButton from '../Common/custombutton/CustomButton';
import hrIcon from '../../assets/images/dashboard/hr-icon.svg';
import OverviewCard from '../Common/overviewCard/OverviewCard';
import { Tab, Tabs } from '@mui/material';

import icon2 from '../../assets/images/icon-2.svg';
import icon3 from '../../assets/images/icon-3.svg';
import icon4 from '../../assets/images/icon-4.svg';
import icon5 from '../../assets/images/icon-5.svg';
import icon6 from '../../assets/images/icon-6.svg';
import JobInfoCard from '../Common/jobInfoCard/JobInfoCard';

// -table--------------------

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import Link from '@mui/material/Link';

import actionEye from '../../assets/images/action-ic-eye.svg';

import calendarBlueIc from '../../assets/images/ic-calendar-blue.svg';

import applicantQalifyStat from '../../assets/images/ic-applicant-qualify-stat.svg';

import { useState } from 'react';
import UserProfileModal from '../Common/usermodal/UserProfileModel';

type UserProfile = {
  name: string;
  status: string;
  jobId: string;
  subject: string;
  interviewDateTime: string;
  aiScore: string;
  aiRank: string;
  imageUrl?: string; // Optional, if not always available
};

const rows = [
  {
    jobId: '#2633',
    subject: 'Math',
    candidateName: 'Jane Smith',
    interviewDateTime: '27 Feb - 11:00am',
    aiScore: '92%',
    aiRank: 'P2',
    status: 'Interview Complete',
    statusClass: 'complete',
    user: {
      name: 'Jane Smith',
      status: 'Interview Complete',
      jobId: '#2633',
      subject: 'Math',
      interviewDateTime: '27 Feb - 11:00am',
      aiScore: '92%',
      aiRank: 'P2',
    },
  },
  {
    jobId: '#2634',
    subject: 'Science',
    candidateName: 'John Doe',
    interviewDateTime: '28 Feb - 02:00pm',
    aiScore: '85%',
    aiRank: 'P3',
    status: 'Pending Interview Confirmation',
    statusClass: 'pending',
    user: {
      name: 'John Doe',
      status: 'Pending Interview Confirmation',
      jobId: '#2634',
      subject: 'Science',
      interviewDateTime: '28 Feb - 02:00pm',
      aiScore: '85%',
      aiRank: 'P3',
    },
  },
  {
    jobId: '#2635',
    subject: 'English',
    candidateName: 'Emily Davis',
    interviewDateTime: '--',
    aiScore: '89%',
    aiRank: 'P4',
    status: 'Wait for Interview',
    statusClass: 'match-found',
    user: {
      name: 'Emily Davis',
      status: 'Wait for Interview',
      jobId: '#2635',
      subject: 'English',
      interviewDateTime: '--',
      aiScore: '89%',
      aiRank: 'P4',
    },
  },
  {
    jobId: '#2636',
    subject: 'History',
    candidateName: 'Michael Johnson',
    interviewDateTime: '29 Feb - 10:30am',
    aiScore: '90%',
    aiRank: 'P5',
    status: 'Interview Accepted',
    statusClass: 'req-submit',
    user: {
      name: 'Michael Johnson',
      status: 'Interview Accepted',
      jobId: '#2636',
      subject: 'History',
      interviewDateTime: '29 Feb - 10:30am',
      aiScore: '90%',
      aiRank: 'P5',
    },
  },
  {
    jobId: '#2637',
    subject: 'Chemistry',
    candidateName: 'Sophia Lee',
    interviewDateTime: '--',
    aiScore: '95%',
    aiRank: 'P1',
    status: 'Wait for Interview Schedule',
    statusClass: 'match-found',
    user: {
      name: 'Sophia Lee',
      status: 'Wait for Interview Schedule',
      jobId: '#2637',
      subject: 'Chemistry',
      interviewDateTime: '--',
      aiScore: '95%',
      aiRank: 'P1',
    },
  },
];

// -table--------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="d-tab-content">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// JobInfo Card Data
const JobInfoData = [
  {
    title: 'Draft Saved',
    requestnumber: '2',
    description: 'Pending HR submission',
    imageUrl: icon2,
    colorTheme: '#F8312F',
  },
  {
    title: 'Requests Submitted',
    requestnumber: '3',
    description: 'Sent for AI matching',
    imageUrl: icon3,
    colorTheme: '#00B15A',
  },
  {
    title: 'Matches Found',
    requestnumber: '4',
    description: 'Candidates available for review',
    imageUrl: icon4,
    colorTheme: '#0074BA',
  },
  {
    title: 'HR Modifications',
    requestnumber: '10',
    description: 'Job details update',
    imageUrl: icon5,
    colorTheme: '#EFB61B',
  },
  {
    title: 'Pending Acceptance',
    requestnumber: '20',
    description: 'Teachers notified, awaiting responses',
    imageUrl: icon6,
    colorTheme: '#F8312F',
  },
];

const JobInfoData_2 = [
  {
    title: 'Draft Saved',
    requestnumber: '2',
    description: 'Pending HR submission',
    imageUrl: icon2,
    colorTheme: '#F8312F',
  },
  {
    title: 'Requests Submitted',
    requestnumber: '3',
    description: 'Sent for AI matching',
    imageUrl: icon3,
    colorTheme: '#00B15A',
  },
  {
    title: 'Matches Found',
    requestnumber: '4',
    description: 'Candidates available for review',
    imageUrl: icon4,
    colorTheme: '#0074BA',
  },
];

const DashboardHome = () => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const handleOpen = (user: UserProfile) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const [value, setValue] = React.useState(0);
  // const { user } = useUserData();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="dashboardholder">
      <div className="dashboard-sub-title pt-[30px] ">
        <h5>Dashboard</h5>
      </div>

      <div className="dashboard-title">
        <h2>Overview</h2>
        <div className="button-group-ss grid gap-[10px]">
          <CustomButton
            label="Create Job Request"
            variant="contained"
            buttonLink="/job-request/create"
          />
        </div>
      </div>

      <div className="overview-card-row grid gap-[24px] grid-cols-5 mt-[35px]">
        <OverviewCard icon={hrIcon} title="Main Title" subtitle="sub title" count="5" />
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="d-tab-header">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="ss-tab-nav"
          variant="scrollable"
        >
          <Tab label="New Job Requests" {...a11yProps(0)} />
          <Tab label="Pending Interviews" {...a11yProps(1)} />
          <Tab label="Engagements In Progress" {...a11yProps(2)} />
          <Tab label="Teacher Ratings & Feedback" {...a11yProps(3)} />
          <Tab label="Pending Timesheets Approval" {...a11yProps(4)} />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <div className="job-info-card__tab-panel">
          <div className="dashboard-title">
            <h3>New Job Requests Overview</h3>
          </div>
          <div className="jobinfo-card-row grid gap-[24px] grid-cols-5 mt-[20px]">
            {JobInfoData?.map((card, index) => (
              <JobInfoCard
                key={index}
                title={card.title}
                count={card.requestnumber}
                description={card.description}
                colorTheme={card.colorTheme}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="job-info-card__tab-panel">
          <div className="dashboard-title">
            <h3>Pending Interviews</h3>
          </div>
          <div className="jobinfo-card-row grid gap-[24px] grid-cols-5 mt-[20px]">
            {JobInfoData_2?.map((card, index) => (
              <JobInfoCard
                key={index}
                title={card.title}
                count={card.requestnumber}
                description={card.description}
                colorTheme={card.colorTheme}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="job-info-card__tab-panel">
          <div className="dashboard-title">
            <h3>Engagements In Progress</h3>
          </div>
          <div className="jobinfo-card-row grid gap-[24px] grid-cols-5 mt-[20px]">
            {JobInfoData?.map((card, index) => (
              <JobInfoCard
                key={index}
                title={card.title}
                count={card.requestnumber}
                description={card.description}
                colorTheme={card.colorTheme}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="job-info-card__tab-panel">
          <div className="dashboard-title">
            <h3>Teacher Ratings & Feedback</h3>
          </div>
          <div className="jobinfo-card-row grid gap-[24px] grid-cols-5 mt-[20px]">
            {JobInfoData_2?.map((card, index) => (
              <JobInfoCard
                key={index}
                title={card.title}
                count={card.requestnumber}
                description={card.description}
                colorTheme={card.colorTheme}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <div className="job-info-card__tab-panel">
          <div className="dashboard-title">
            <h3>Pending Timesheets Approval</h3>
          </div>
          <div className="jobinfo-card-row grid gap-[24px] grid-cols-5 mt-[20px]">
            {JobInfoData?.map((card, index) => (
              <JobInfoCard
                key={index}
                title={card.title}
                count={card.requestnumber}
                description={card.description}
                colorTheme={card.colorTheme}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </CustomTabPanel>

      {/* --------------------table--------------- */}
      <br />
      <br />
      <br />
      <br />

      <div className="dash-table-outer-wrap mt-5">
        <h3>Table</h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Subject</th>
              <th>Candidate Name</th>
              <th>Interview Date - Time</th>
              <th>AI Match Score</th>
              <th>AI Ranking</th>
              <th>Candidates Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.jobId}</td>
                <td>{row.subject}</td>
                <td>{row.candidateName}</td>
                <td>{row.interviewDateTime}</td>
                <td>{row.aiScore}</td>
                <td>{row.aiRank}</td>
                <td>
                  <Tooltip title={row.status} placement="top" TransitionComponent={Zoom} arrow>
                    <span className={`default-status ${row.statusClass}`}>{row.status}</span>
                  </Tooltip>
                </td>
                <td className="table-action">
                  <ul>
                    <li>
                      <Tooltip title="View" placement="top" arrow>
                        <Link onClick={() => handleOpen(row.user)} sx={{ cursor: 'pointer' }}>
                          <img src={actionEye} alt="View" />
                        </Link>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip title="Date" placement="top" arrow>
                        <Link href="#">
                          <img src={calendarBlueIc} alt="Calendar" />
                        </Link>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip title="Applicant Status" placement="top" arrow>
                        <Link href="#">
                          <img src={applicantQalifyStat} alt="Status" />
                        </Link>
                      </Tooltip>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Reusable modal shown here */}
        {selectedUser && (
          <UserProfileModal open={openModal} onClose={handleClose} user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
