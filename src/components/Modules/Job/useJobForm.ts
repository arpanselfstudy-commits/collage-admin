import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JobApi from "../../../service/apis/Job.api";
import { Job, JobType, CreateJobPayload, UpdateJobPayload } from "../../../types/jobTypes";

export interface JobFormValues {
  jobName: string;
  jobProvider: string;
  type: JobType;
  deadline: string;
  location: string;
  experience: number;
  salaryFrom: number;
  salaryTo: number;
  jobDescription: string;
  responsibilities: { value: string }[];
  contactEmail: string;
  contactPhone: string;
}

const schema = Yup.object().shape({
  jobName: Yup.string().trim().required("Job name is required"),
  jobProvider: Yup.string().trim().required("Job provider is required"),
  type: Yup.string()
    .oneOf(["full-time", "part-time"] as const)
    .required("Job type is required"),
  deadline: Yup.string().required("Deadline is required"),
  location: Yup.string().trim().required("Location is required"),
  experience: Yup.number().min(0, "Must be 0 or more").required("Experience is required"),
  salaryFrom: Yup.number().min(0, "Must be 0 or more").required("Salary from is required"),
  salaryTo: Yup.number()
    .min(0, "Must be 0 or more")
    .required("Salary to is required")
    .test("salary-range", "Salary to must be ≥ salary from", function (val) {
      return val >= this.parent.salaryFrom;
    }),
  jobDescription: Yup.string().trim().required("Job description is required"),
  responsibilities: Yup.array()
    .of(Yup.object().shape({ value: Yup.string().trim().required("Cannot be empty") }))
    .min(1, "Add at least one responsibility"),
  contactEmail: Yup.string().trim().email("Enter a valid email").required("Contact email is required"),
  contactPhone: Yup.string().trim().required("Contact phone is required"),
});

const emptyDefaults: JobFormValues = {
  jobName: "",
  jobProvider: "",
  type: "full-time" as JobType,
  deadline: "",
  location: "",
  experience: 0,
  salaryFrom: 0,
  salaryTo: 0,
  jobDescription: "",
  responsibilities: [{ value: "" }],
  contactEmail: "",
  contactPhone: "",
};

const jobToFormValues = (job: Job): JobFormValues => ({
  jobName: job.jobName,
  jobProvider: job.jobProvider,
  type: job.type,
  // format ISO date to yyyy-MM-dd for the date input
  deadline: job.deadline ? job.deadline.slice(0, 10) : "",
  location: job.location,
  experience: job.experience,
  salaryFrom: job.salary.from,
  salaryTo: job.salary.to,
  jobDescription: job.jobDescription,
  responsibilities: job.responsibilities.map((r) => ({ value: r })),
  contactEmail: job.contactDetails.email,
  contactPhone: job.contactDetails.phoneNo,
});

const useJobForm = (onSuccess: () => void, editJob?: Job | null) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!editJob;

  const formMethods = useForm<JobFormValues>({
    defaultValues: editJob ? jobToFormValues(editJob) : emptyDefaults,
    resolver: yupResolver(schema) as any,
    mode: "onTouched",
  });

  const { handleSubmit, control, reset } = formMethods;

  // When editJob changes (modal opens with a different job), reset the form
  useEffect(() => {
    reset(editJob ? jobToFormValues(editJob) : emptyDefaults);
  }, [editJob]);

  const responsibilitiesField = useFieldArray({ control, name: "responsibilities" });

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    setLoading(true);
    try {
      const base = {
        jobName: data.jobName,
        jobProvider: data.jobProvider,
        type: data.type as JobType,
        deadline: new Date(data.deadline).toISOString(),
        location: data.location,
        experience: Number(data.experience),
        salary: { from: Number(data.salaryFrom), to: Number(data.salaryTo) },
        jobDescription: data.jobDescription,
        responsibilities: data.responsibilities.map((r) => r.value),
        contactDetails: { email: data.contactEmail, phoneNo: data.contactPhone },
      };

      if (isEdit && editJob) {
        const payload: UpdateJobPayload = { ...base, jobId: editJob.jobId };
        const res = await JobApi.updateJob(editJob.jobId, payload);
        if (res.success) {
          toast.success("Job updated successfully");
          reset(emptyDefaults);
          onSuccess();
        } else {
          toast.error(res.message || "Failed to update job");
        }
      } else {
        const payload: CreateJobPayload = base;
        const res = await JobApi.createJob(payload);
        if (res.success) {
          toast.success("Job created successfully");
          reset(emptyDefaults);
          onSuccess();
        } else {
          toast.error(res.message || "Failed to create job");
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    formMethods,
    responsibilitiesField,
    loading,
    isEdit,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useJobForm;
