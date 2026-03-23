import { Dialog, DialogContent } from "@mui/material";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import FormField from "../../Common/form/FormField";
import CustomButton from "../../Common/custombutton/CustomButton";
import RichTextEditor from "../../Common/RichTextEditor/RichTextEditor";
import useCmsForm, { CMS_TYPES } from "./useCmsForm";
import { CmsItem } from "../../../types/cmsTypes";

interface CmsFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editItem?: CmsItem | null;
}

const CmsFormModal = ({ open, onClose, onSaved, editItem }: CmsFormModalProps) => {
  const { formMethods, loading, isEdit, setValue, onSubmit } = useCmsForm(() => {
    onSaved();
    onClose();
  }, editItem);

  const { register, watch, formState: { errors } } = formMethods;
  const content = watch("content");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      slotProps={{
        paper: {
          style: {
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
          },
        },
      }}
    >
      {/* Header */}
      <div style={{ background: "var(--clr-primary)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <h3 style={{ color: "#fff", margin: 0, fontSize: "18px", fontWeight: 600 }}>
          {isEdit ? "Edit CMS Item" : "Create CMS Item"}
        </h3>
        <button type="button" onClick={onClose}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px" }}>
          <IoCloseOutline size={20} />
        </button>
      </div>

      <DialogContent style={{ padding: "24px 28px", overflowY: "auto", flex: "1 1 auto" }}>
        <form onSubmit={onSubmit} className="form-main">

          <div className="grid grid-cols-2 gap-4">
            {/* Type select */}
            <div className="form-group mb-5">
              <label htmlFor="cms-type" className="block font-semibold mb-1 label-colr">
                Type <span className="mandatory-icon">*</span>
              </label>
              <select
                id="cms-type"
                {...register("type")}
                className="form-control w-full"
                disabled={isEdit}
              >
                {CMS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type.message}</div>}
            </div>

            {/* Title */}
            <FormField
              label="Title"
              name="title"
              placeholder="e.g. Terms & Conditions"
              required
              register={register("title")}
              error={errors.title?.message}
            />
          </div>

          {/* Active toggle */}
          <div className="form-group mb-5" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label className="font-semibold label-colr" style={{ margin: 0 }}>Active</label>
            <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" {...register("isActive")} style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
              <span style={{
                width: "42px", height: "22px",
                background: watch("isActive") ? "var(--clr-primary)" : "#ccc",
                borderRadius: "11px", display: "inline-block", transition: "background 0.2s", position: "relative"
              }}>
                <span style={{
                  position: "absolute", top: "4px",
                  left: watch("isActive") ? "22px" : "4px",
                  width: "14px", height: "14px",
                  background: "#fff", borderRadius: "50%", transition: "left 0.2s"
                }} />
              </span>
            </label>
          </div>

          {/* Rich text editor */}
          <RichTextEditor
            label="Content"
            required
            value={content}
            onChange={(val) => setValue("content", val, { shouldValidate: true, shouldDirty: true })}
            error={errors.content?.message}
            minHeight={280}
          />

          {/* Footer */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "10px 24px", borderRadius: "8px", border: "1.5px solid var(--border-color)", background: "#fff", color: "var(--clr-dark-gray)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
              Cancel
            </button>
            <CustomButton
              label={loading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create")}
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

export default CmsFormModal;
