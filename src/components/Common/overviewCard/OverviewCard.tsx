import React from 'react';
import { Link } from 'react-router-dom';

type OverviewCardProps = {
  icon: string;
  subtitle: string;
  title: string;
  count: number | string;
};

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, subtitle, title, count }) => {
  return (
    <Link to="#" className="overview-card rounded-[10px] p-[20px] text-right">
      <div className="overview-card-header flex items-start justify-between">
        <div className="overview-icon w-[44px] aspect-square flex items-center justify-center rounded-[6px] p-[5px]">
          <img src={icon} alt={`${title.toLowerCase()}-icon`} />
        </div>
        <div className="overview-title">
          <h5 className="!font-[400] !mb-[5px]">{subtitle}</h5>
          <h4>{title}</h4>
        </div>
      </div>
      <div className="overview-count">
        <h2 className="!mb-0">{count}</h2>
      </div>
    </Link>
  );
};

export default OverviewCard;
