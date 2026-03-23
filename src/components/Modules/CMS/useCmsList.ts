import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import CmsApi from "../../../service/apis/Cms.api";
import { CmsItem } from "../../../types/cmsTypes";

const useCmsList = () => {
  const [items, setItems] = useState<CmsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CmsItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CmsApi.getAll();
      if (res.success) setItems(res.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load CMS items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await CmsApi.delete(deleteTarget.type);
      toast.success("CMS item deleted");
      setDeleteTarget(null);
      fetchAll();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return {
    items,
    loading,
    refresh: fetchAll,
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDeleteConfirm,
  };
};

export default useCmsList;
