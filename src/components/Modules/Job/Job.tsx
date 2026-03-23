import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { IoTrashOutline, IoAddOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import dayjs from "dayjs";

import DataTable, { ColumnDef } from "../../Common/DataTable/DataTable";
import SearchInput from "../../Common/SearchInput/SearchInput";
import ConfirmModal from "../../Common/ConfirmModal/ConfirmModal";
import JobFormModal from "./JobFormModal";
import CustomButton from "../../Common/custombutton/CustomButton";
import useJobList from "./useJobList";
import { Job as JobType } from "../../../types/jobTypes";

const JOB_TYPE_LABEL: Record<string, string> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
};

const columns: ColumnDef<JobType>[] = [
  { key: "jobId", label: "Job ID" },
  { key: "jobName", label: "Job Name" },
  { key: "jobProvider", label: "Provider" },
  {
    key: "type",
    label: "Type",
    render: (row) => (
      <span className="default-status req-submit">{JOB_TYPE_LABEL[row.type] ?? row.type}</span>
    ),
  },
  { key: "location", label: "Location" },
  {
    key: "experience",
    label: "Experience",
    render: (row) => `${row.experience} yr${row.experience !== 1 ? "s" : ""}`,
  },
  {
    key: "salary",
    label: "Salary",
    render: (row) => `$${row.salary.from.toLocaleString()} – $${row.salary.to.toLocaleString()}`,
  },
  {
    key: "deadline",
    label: "Deadline",
    render: (row) => dayjs(row.deadline).format("DD MMM YYYY"),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => null, // overridden below via wrapper
  },
];

const Job = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState<JobType | null>(null);

  const openCreate = () => { setEditJob(null); setModalOpen(true); };
  const openEdit = (job: JobType) => { setEditJob(job); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditJob(null); };

  const {
    jobs,
    pagination,
    loading,
    handleSearch,
    handlePageChange,
    refresh,
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDeleteConfirm,
  } = useJobList();

  const columnsWithActions: ColumnDef<JobType>[] = [
    ...columns.filter((c) => c.key !== "actions"),
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="table-action">
          <ul>
            <li>
              <Tooltip title="Edit" placement="top" TransitionComponent={Zoom} arrow>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--clr-primary)", display: "flex" }}
                  onClick={() => openEdit(row)}
                >
                  <FiEdit2 size={17} />
                </button>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Delete" placement="top" TransitionComponent={Zoom} arrow>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#e53e3e", display: "flex" }}
                  onClick={() => setDeleteTarget(row)}
                >
                  <IoTrashOutline size={18} />
                </button>
              </Tooltip>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboardholder">
      {/* <div className="dashboard-sub-title pt-[30px]">
        <h5>Job Management</h5>
      </div> */}

      <div className="dashboard-title pt-[10px]">
        <h2>Jobs</h2>
        <CustomButton
          label="Create Job"
          variant="contained"
          icon={<IoAddOutline size={16} />}
          onClick={openCreate}
        />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
        <SearchInput
          placeholder="Search by job name, location..."
          onSearch={handleSearch}
        />
       
      </div>

      <DataTable<JobType>
        columns={columnsWithActions}
        rows={jobs}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No jobs found. Try a different search."
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Job?"
        description={deleteTarget ? `"${deleteTarget.jobName}" will be permanently removed.` : ""}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        variant="danger"
        icon={<IoTrashOutline />}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <JobFormModal
        open={modalOpen}
        onClose={closeModal}
        onSaved={refresh}
        editJob={editJob}
      />
    </div>
  );
};

export default Job;
