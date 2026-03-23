import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const DatePickerField = ({
  label,
  required,
  value,
  onChange,
  error,
  disabled,
  className = "form-group mb-5",
}: DatePickerFieldProps) => {
  const dayjsValue: Dayjs | null = value ? dayjs(value) : null;

  return (
    <div className={className}>
      <label className="block font-semibold mb-1 label-colr">
        {label} {required && <span className="mandatory-icon">*</span>}
      </label>
      <DatePicker
        value={dayjsValue}
        disabled={disabled}
        onChange={(newVal) => {
          onChange(newVal ? newVal.toISOString() : "");
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            sx: {
              width: "100%",
              "& .MuiOutlinedInput-root": {
                height: "56px",
                borderRadius: "6px",
                background: "#f6feff",
                fontSize: "14px",
                color: "var(--clr-dark-gray, #5a5a5a)",
                paddingLeft: "8px",
                // Remove all borders except bottom
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                // Bottom border only — matches .form-control
                borderBottom: "2px solid #05a0bf",
                "&.Mui-focused": {
                  borderBottom: "2px solid #05a0bf",
                  boxShadow: "none",
                },
              },
              "& .MuiInputBase-input": {
                padding: "0 0 0 12px",
                fontSize: "14px",
                color: "var(--clr-dark-gray, #5a5a5a)",
                height: "56px",
              },
              // Responsive: match form-control height at ≤1799px
              "@media (max-width: 1799px)": {
                "& .MuiOutlinedInput-root": {
                  height: "46px",
                },
                "& .MuiInputBase-input": {
                  height: "46px",
                },
              },
            },
          },
        }}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default DatePickerField;
