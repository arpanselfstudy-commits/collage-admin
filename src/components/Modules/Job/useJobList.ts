import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import JobApi from "../../../service/apis/Job.api";
import { Job } from "../../../types/jobTypes";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const LIMIT = 10;

const useJobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: LIMIT, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // delete state
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = useCallback(async (currentPage: number, currentSearch: string) => {
    setLoading(true);
    try {
      const res = await JobApi.getJobs({ page: currentPage, limit: LIMIT, search: currentSearch || undefined });
      if (res.success) {
        setJobs(res.data.jobs);
        setPagination(res.data.pagination);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(page, search);
  }, [page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await JobApi.deleteJob(deleteTarget.jobId);
      toast.success("Job deleted successfully");
      setDeleteTarget(null);
      fetchJobs(page, search);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  return {
    jobs,
    pagination,
    loading,
    search,
    handleSearch,
    handlePageChange,
    refresh: () => fetchJobs(page, search),
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDeleteConfirm,
  };
};

export default useJobList;
