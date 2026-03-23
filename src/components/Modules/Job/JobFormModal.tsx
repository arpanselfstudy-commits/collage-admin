import { Dialog, DialogContent } from "@mui/material";
import { IoAddOutline, IoTrashOutline, IoCloseOutline } from "react-icons/io5";
import FormField from "../../Common/form/FormField";
import DatePickerField from "../../Common/DatePickerField/DatePickerField";
import CustomButton from "../../Common/custombutton/CustomButton";
import useJobForm from "./useJobForm";
import { Job } from "../../../types/jobTypes";

interface JobFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editJob?: Job | null;
}

const JOB_TYPES = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
];

const JobFormModal = ({ open, onClose, onSaved, editJob }: JobFormModalProps) => {
  const { formMethods, responsibilitiesField, loading, isEdit, onSubmit } = useJobForm(() => {
    onSaved();
    onClose();
  }, editJob);

  const { register, formState: { errors }, watch, setValue } = formMethods;
  const { fields, append, remove } = responsibilitiesField;

  // Prevent the native date picker calendar from bubbling clicks to the Dialog backdrop

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
      maxWidth="md"
      fullWidth
      // disablePortal keeps the dialog in the normal DOM tree which fixes
      // the native date-picker click-through issue on the backdrop
      disablePortal={false}
      slotProps={{
        paper: {
          style: {
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* Sticky header */}
      <div
        style={{
          background: "var(--clr-primary)",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <h3 style={{ color: "#fff", margin: 0, fontSize: "18px", fontWeight: 600 }}>
          {isEdit ? "Edit Job" : "Create New Job"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
          }}
        >
          <IoCloseOutline size={20} />
        </button>
      </div>

      {/* Scrollable body */}
      <DialogContent
        dividers
        style={{
          padding: "24px 28px",
          overflowY: "auto",
          flex: "1 1 auto",
        }}
      >
        <form onSubmit={onSubmit} className="form-main">

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Job Name" name="jobName" placeholder="e.g. Senior Math Teacher" required
              register={register("jobName")} error={errors.jobName?.message} />
            <FormField label="Job Provider" name="jobProvider" placeholder="e.g. ABC School" required
              register={register("jobProvider")} error={errors.jobProvider?.message} />
          </div>

          {/* Row 2 — Type + Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-5">
              <label htmlFor="type" className="block font-semibold mb-1 label-colr">
                Job Type <span className="mandatory-icon">*</span>
              </label>
              <select id="type" {...register("type")} className="form-control w-full">
                {JOB_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type.message}</div>}
            </div>

            {/* Date picker */}
            <DatePickerField
              label="Deadline"
              required
              value={watch("deadline") || ""}
              onChange={(val) => setValue("deadline", val, { shouldValidate: true })}
              error={errors.deadline?.message}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Location" name="location" placeholder="e.g. New York, NY" required
              register={register("location")} error={errors.location?.message} />
            <FormField label="Experience (years)" name="experience" type="text" placeholder="e.g. 3" required
              register={register("experience")} error={errors.experience?.message} />
          </div>

          {/* Row 4 — Salary */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Salary From ($)" name="salaryFrom" type="text" placeholder="e.g. 40000" required
              register={register("salaryFrom")} error={errors.salaryFrom?.message} />
            <FormField label="Salary To ($)" name="salaryTo" type="text" placeholder="e.g. 60000" required
              register={register("salaryTo")} error={errors.salaryTo?.message} />
          </div>

          {/* Description */}
          <FormField label="Job Description" name="jobDescription" type="textarea" rows={4}
            placeholder="Describe the role and requirements..." required
            register={register("jobDescription")} error={errors.jobDescription?.message} />

          {/* Responsibilities */}
          <div className="form-group mb-5">
            <label className="block font-semibold mb-2 label-colr">
              Responsibilities <span className="mandatory-icon">*</span>
            </label>
            {fields.map((field, index) => (
              <div key={field.id} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
                <input
                  {...register(`responsibilities.${index}.value`)}
                  placeholder={`Responsibility ${index + 1}`}
                  className="form-control"
                  style={{ flex: 1 }}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    style={{ height: "56px", width: "44px", flexShrink: 0, background: "#fff1f1", border: "1px solid #fca5a5", borderRadius: "6px", cursor: "pointer", color: "#e53e3e", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <IoTrashOutline size={17} />
                  </button>
                )}
              </div>
            ))}
            {errors.responsibilities && (
              <div className="text-red-500 text-sm mt-1">
                {typeof errors.responsibilities.message === "string"
                  ? errors.responsibilities.message
                  : (errors.responsibilities as any)?.[0]?.value?.message}
              </div>
            )}
            <button
              type="button"
              onClick={() => append({ value: "" })}
              style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--primary-color-light)", border: "1px solid var(--clr-accent-blue)", borderRadius: "8px", padding: "7px 14px", cursor: "pointer", color: "var(--clr-primary)", fontSize: "13px", fontWeight: 600 }}
            >
              <IoAddOutline size={16} /> Add Responsibility
            </button>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Contact Email" name="contactEmail" type="email" placeholder="hr@company.com" required
              register={register("contactEmail")} error={errors.contactEmail?.message} />
            <FormField label="Contact Phone" name="contactPhone" placeholder="+1 234 567 8900" required
              register={register("contactPhone")} error={errors.contactPhone?.message} />
          </div>

          {/* Footer */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "10px 24px", borderRadius: "8px", border: "1.5px solid var(--border-color)", background: "#fff", color: "var(--clr-dark-gray)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>
            <CustomButton
              label={loading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Job")}
              variant="contained"
              type="submit"
              disabled={loading}
              icon={<IoAddOutline size={16} />}
            />
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobFormModal;
