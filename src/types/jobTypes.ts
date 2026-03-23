export type JobType = "full-time" | "part-time";

export interface JobSalary {
  from: number;
  to: number;
}

export interface JobContactDetails {
  email: string;
  phoneNo: string;
}

export interface Job {
  jobName: string;
  jobId: string;
  jobProvider: string;
  type: JobType;
  deadline: string;
  location: string;
  experience: number;
  salary: JobSalary;
  jobDescription: string;
  responsibilities: string[];
  contactDetails: JobContactDetails;
}

export interface JobsListResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    jobs: Job[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface JobResponse {
  code: number;
  success: boolean;
  message: string;
  data: Job;
}

export interface JobListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type CreateJobPayload = Omit<Job, "jobId">;
export type UpdateJobPayload = Job;
