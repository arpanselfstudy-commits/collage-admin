import { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
  defaultValue?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
  debounceMs = 500,
  defaultValue = "",
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(value.trim());
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <svg
        style={{ position: "absolute", left: "12px", color: "#a1a1a1", flexShrink: 0 }}
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: "36px",
          paddingRight: value ? "36px" : "12px",
          paddingTop: "10px",
          paddingBottom: "10px",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          fontSize: "14px",
          color: "var(--clr-dark-gray)",
          outline: "none",
          width: "280px",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--clr-primary)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          style={{
            position: "absolute", right: "10px", background: "none",
            border: "none", cursor: "pointer", color: "#a1a1a1", padding: "2px",
            display: "flex", alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
