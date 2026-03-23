import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JobApi from "../../../service/apis/Job.api";
import { CreateJobPayload } from "../../../types/jobTypes";

export interface JobFormValues {
  jobName: string;
  jobProvider: string;
  type: "full-time" | "part-time";
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
  type: Yup.string().oneOf(["part-time","full-time"]).required("Job type is required"),
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

const useCreateJob = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<JobFormValues>({
    defaultValues: {
      jobName: "",
      jobProvider: "",
      type: "full-time",
      deadline: "",
      location: "",
      experience: 0,
      salaryFrom: 0,
      salaryTo: 0,
      jobDescription: "",
      responsibilities: [{ value: "" }],
      contactEmail: "",
      contactPhone: "",
    },
    resolver: yupResolver(schema) as any,
    mode: "onTouched",
  });

  const { handleSubmit, control } = formMethods;

  const responsibilitiesField = useFieldArray({ control, name: "responsibilities" });

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    setLoading(true);
    try {
      const payload: CreateJobPayload = {
        jobName: data.jobName,
        jobProvider: data.jobProvider,
        type: data.type,
        deadline: new Date(data.deadline).toISOString(),
        location: data.location,
        experience: data.experience,
        salary: { from: data.salaryFrom, to: data.salaryTo },
        jobDescription: data.jobDescription,
        responsibilities: data.responsibilities.map((r) => r.value),
        contactDetails: { email: data.contactEmail, phoneNo: data.contactPhone },
      };
      const res = await JobApi.createJob(payload);
      if (res.success) {
        toast.success("Job created successfully");
        formMethods.reset();
        onSuccess();
      } else {
        toast.error(res.message || "Failed to create job");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return {
    formMethods,
    responsibilitiesField,
    loading,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useCreateJob;
