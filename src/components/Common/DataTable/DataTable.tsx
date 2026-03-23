import { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export interface ColumnDef<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  loading?: boolean;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  loading = false,
  pagination,
  onPageChange,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <div className="dash-table-outer-wrap mt-5">
      <table className="custom-table" style={{ width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "40px", color: "var(--muted-color)" }}>
                Loading...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "40px", color: "var(--muted-color)" }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && pagination.pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--muted-color-dark)" }}>
            Showing {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Tooltip title="Previous" TransitionComponent={Zoom} arrow>
              <button
                onClick={() => onPageChange?.(pagination.page - 1)}
                disabled={pagination.page <= 1}
                style={paginationBtnStyle(pagination.page <= 1)}
              >
                ‹
              </button>
            </Tooltip>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange?.(p)}
                style={paginationBtnStyle(false, p === pagination.page)}
              >
                {p}
              </button>
            ))}
            <Tooltip title="Next" TransitionComponent={Zoom} arrow>
              <button
                onClick={() => onPageChange?.(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                style={paginationBtnStyle(pagination.page >= pagination.pages)}
              >
                ›
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

const paginationBtnStyle = (disabled: boolean, active = false): React.CSSProperties => ({
  minWidth: "34px",
  height: "34px",
  padding: "0 8px",
  borderRadius: "8px",
  border: active ? "none" : "1px solid var(--border-color)",
  background: active ? "var(--clr-primary)" : disabled ? "#f5f5f5" : "#fff",
  color: active ? "#fff" : disabled ? "#ccc" : "var(--clr-dark-gray)",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: active ? 600 : 400,
  transition: "all 0.2s",
});

export default DataTable;
