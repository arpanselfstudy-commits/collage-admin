type JobInfoCardProps = {
  title: string;
  description: string;
  count: string;
  imageUrl?: string;
  colorTheme?: string;
};

const JobInfoCard = ({
  title = 'Title',
  description = 'Description',
  count = '99',
  imageUrl = '',
  colorTheme = '#FF6723',
}: JobInfoCardProps) => {
  return (
    <>
      <div
        className="job-info-card p-[20px] rounded-[20px] flex flex-col items-start relative overflow-hidden"
        style={{ ['--color-theme' as any]: colorTheme }}
      >
        {imageUrl && (
          <div className="info-icon-wrap rounded-[10px] p-[15px] mb-[20px] relative z-1">
            <img src={imageUrl} alt={title} className="info-icon" />
          </div>
        )}
        <div className="job-info-card-content relative z-1">
          <h4 className="!mb-[10px] !font-[500]">{title}</h4>
          <h2 className="!mb-[5px]">{count}</h2>
          <h5 className="!mb-[0px]">{description}</h5>
        </div>
        <div className="bg-overlay absolute inset-[0] opacity-[0.07]"></div>
      </div>
    </>
  );
};

export default JobInfoCard;
