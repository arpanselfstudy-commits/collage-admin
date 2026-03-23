import { Dialog, DialogContent } from "@mui/material";
import { IoAddOutline, IoCloseOutline, IoTrashOutline } from "react-icons/io5";
import FormField from "../../Common/form/FormField";
import DatePickerField from "../../Common/DatePickerField/DatePickerField";
import CustomButton from "../../Common/custombutton/CustomButton";
import useShopForm from "./useShopForm";
import { Shop } from "../../../types/shopTypes";

interface ShopFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editShop?: Shop | null;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

const sectionTitle = (text: string) => (
  <div style={{ borderBottom: "2px solid var(--primary-color-light)", paddingBottom: "6px", marginBottom: "16px", marginTop: "8px" }}>
    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--clr-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {text}
    </span>
  </div>
);

const ShopFormModal = ({ open, onClose, onSaved, editShop }: ShopFormModalProps) => {
  const { formMethods, offersField, loading, isEdit, onSubmit } = useShopForm(() => {
    onSaved();
    onClose();
  }, editShop);

  const { register, watch, setValue, formState: { errors } } = formMethods;
  const { fields: offerFields, append: appendOffer, remove: removeOffer } = offersField;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
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
      {/* Sticky header */}
      <div style={{ background: "var(--clr-primary)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <h3 style={{ color: "#fff", margin: 0, fontSize: "18px", fontWeight: 600 }}>
          {isEdit ? "Edit Shop" : "Create New Shop"}
        </h3>
        <button type="button" onClick={onClose}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px" }}>
          <IoCloseOutline size={20} />
        </button>
      </div>

      <DialogContent style={{ padding: "24px 28px", overflowY: "auto", flex: "1 1 auto" }}>
        <form onSubmit={onSubmit} className="form-main">

          {/* ── Basic Info ── */}
          {sectionTitle("Basic Info")}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Shop Name" name="name" placeholder="e.g. ABC Bookstore" required
              register={register("name")} error={errors.name?.message} />
            <FormField label="Shop Type" name="type" placeholder="e.g. Bookstore" required
              register={register("type")} error={errors.type?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Location" name="location" placeholder="e.g. 1st Floor, Main Campus" required
              register={register("location")} error={errors.location?.message} />
            <FormField label="Distance" name="distance" placeholder="e.g. 10m away"
              register={register("distance")} error={errors.distance?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Contact Email" name="contactEmail" type="email" placeholder="shop@example.com" required
              register={register("contactEmail")} error={errors.contactEmail?.message} />
            <FormField label="Contact Phone" name="contactPhone" placeholder="+1 234 567 8900" required
              register={register("contactPhone")} error={errors.contactPhone?.message} />
          </div>

          {/* ── Shop Timing ── */}
          {sectionTitle("Shop Timing")}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {DAYS.map((day) => {
              const isOpen = watch(`shopTiming.${day}.isOpen`);
              return (
                <div key={day} style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 1fr", alignItems: "center", gap: "12px", background: isOpen ? "var(--primary-color-light)" : "#f9f9f9", borderRadius: "10px", padding: "10px 14px", border: "1px solid var(--border-color)" }}>
                  {/* Day label + toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" {...register(`shopTiming.${day}.isOpen`)}
                        style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
                        onChange={(e) => setValue(`shopTiming.${day}.isOpen`, e.target.checked, { shouldDirty: true })}
                        checked={!!isOpen}
                      />
                      <span style={{ width: "36px", height: "20px", background: isOpen ? "var(--clr-primary)" : "#ccc", borderRadius: "10px", display: "inline-block", transition: "background 0.2s", position: "relative" }}>
                        <span style={{ position: "absolute", top: "3px", left: isOpen ? "18px" : "3px", width: "14px", height: "14px", background: "#fff", borderRadius: "50%", transition: "left 0.2s" }} />
                      </span>
                    </label>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--clr-dark-gray)", textTransform: "capitalize" }}>{day}</span>
                  </div>

                  {/* Status */}
                  <span style={{ fontSize: "12px", color: isOpen ? "var(--clr-primary)" : "#a1a1a1", fontWeight: 500 }}>
                    {isOpen ? "Open" : "Closed"}
                  </span>

                  {/* Opens At */}
                  <div>
                    <label style={{ fontSize: "11px", color: "#7a7a7a", display: "block", marginBottom: "2px" }}>Opens At</label>
                    <input type="time" {...register(`shopTiming.${day}.opensAt`)} disabled={!isOpen}
                      className="form-control" style={{ height: "36px", fontSize: "13px", opacity: isOpen ? 1 : 0.4 }} />
                  </div>

                  {/* Closes At */}
                  <div>
                    <label style={{ fontSize: "11px", color: "#7a7a7a", display: "block", marginBottom: "2px" }}>Closes At</label>
                    <input type="time" {...register(`shopTiming.${day}.closesAt`)} disabled={!isOpen}
                      className="form-control" style={{ height: "36px", fontSize: "13px", opacity: isOpen ? 1 : 0.4 }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Offers ── */}
          {sectionTitle("Offers")}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
            {offerFields.map((field, index) => (
              <div key={field.id} style={{ border: "1px solid var(--border-color)", borderRadius: "12px", padding: "16px", background: "#fafcff", position: "relative" }}>
                <button type="button" onClick={() => removeOffer(index)}
                  style={{ position: "absolute", top: "12px", right: "12px", background: "#fff1f1", border: "1px solid #fca5a5", borderRadius: "6px", cursor: "pointer", color: "#e53e3e", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px" }}>
                  <IoTrashOutline size={15} />
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Offer Name" name={`offers.${index}.offerName`} placeholder="e.g. Summer Sale" required
                    register={register(`offers.${index}.offerName`)}
                    error={(errors.offers as any)?.[index]?.offerName?.message} />
                  <FormField label="Photo URL" name={`offers.${index}.photo`} placeholder="https://..."
                    register={register(`offers.${index}.photo`)}
                    error={(errors.offers as any)?.[index]?.photo?.message} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DatePickerField
                    label="Start Date"
                    required
                    value={watch(`offers.${index}.startDate`) || ""}
                    onChange={(val) => setValue(`offers.${index}.startDate`, val, { shouldValidate: true })}
                    error={(errors.offers as any)?.[index]?.startDate?.message}
                  />
                  <DatePickerField
                    label="End Date"
                    required
                    value={watch(`offers.${index}.endDate`) || ""}
                    onChange={(val) => setValue(`offers.${index}.endDate`, val, { shouldValidate: true })}
                    error={(errors.offers as any)?.[index]?.endDate?.message}
                  />
                </div>

                <FormField label="Description" name={`offers.${index}.description`} type="textarea" rows={2}
                  placeholder="Describe the offer..." required
                  register={register(`offers.${index}.description`)}
                  error={(errors.offers as any)?.[index]?.description?.message} />
              </div>
            ))}
          </div>

          <button type="button"
            onClick={() => appendOffer({ offerName: "", startDate: "", endDate: "", description: "", photo: "" })}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--primary-color-light)", border: "1px solid var(--clr-accent-blue)", borderRadius: "8px", padding: "7px 14px", cursor: "pointer", color: "var(--clr-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "24px" }}>
            <IoAddOutline size={16} /> Add Offer
          </button>

          {/* Footer */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "10px 24px", borderRadius: "8px", border: "1.5px solid var(--border-color)", background: "#fff", color: "var(--clr-dark-gray)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
              Cancel
            </button>
            <CustomButton
              label={loading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Shop")}
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

export default ShopFormModal;
