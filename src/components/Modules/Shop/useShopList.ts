import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import ShopApi from "../../../service/apis/Shop.api";
import { Shop } from "../../../types/shopTypes";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const LIMIT = 10;

const useShopList = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: LIMIT, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // delete state
  const [deleteTarget, setDeleteTarget] = useState<Shop | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchShops = useCallback(async (currentPage: number, currentSearch: string) => {
    setLoading(true);
    try {
      const res = await ShopApi.getShops({ page: currentPage, limit: LIMIT, search: currentSearch || undefined });
      if (res.success) {
        setShops(res.data.shops);
        setPagination(res.data.pagination);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load shops");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShops(page, search);
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
      await ShopApi.deleteShop(deleteTarget.shopId);
      toast.success("Shop deleted successfully");
      setDeleteTarget(null);
      fetchShops(page, search);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete shop");
    } finally {
      setDeleting(false);
    }
  };

  return {
    shops,
    pagination,
    loading,
    search,
    handleSearch,
    handlePageChange,
    refresh: () => fetchShops(page, search),
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDeleteConfirm,
  };
};

export default useShopList;
