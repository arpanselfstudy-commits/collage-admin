import httpsCall from "../httpsCall";
import {
  JobsListResponse,
  JobResponse,
  JobListParams,
  CreateJobPayload,
  UpdateJobPayload,
} from "../../types/jobTypes";

const JobApi = {
  getJobs: (params: JobListParams): Promise<JobsListResponse> =>
    httpsCall.get("/jobs", { params }) as unknown as Promise<JobsListResponse>,

  getJob: (jobId: string): Promise<JobResponse> =>
    httpsCall.get(`/jobs/${jobId}`) as unknown as Promise<JobResponse>,

  createJob: (data: CreateJobPayload): Promise<JobResponse> =>
    httpsCall.post("/jobs", data) as unknown as Promise<JobResponse>,

  updateJob: (jobId: string, data: UpdateJobPayload): Promise<JobResponse> =>
    httpsCall.put(`/jobs/${jobId}`, data) as unknown as Promise<JobResponse>,

  deleteJob: (jobId: string): Promise<{ code: number; success: boolean; message: string }> =>
    httpsCall.delete(`/jobs/${jobId}`) as unknown as Promise<{ code: number; success: boolean; message: string }>,
};

export default JobApi;
