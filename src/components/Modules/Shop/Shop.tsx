import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { IoTrashOutline, IoAddOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";

import DataTable, { ColumnDef } from "../../Common/DataTable/DataTable";
import SearchInput from "../../Common/SearchInput/SearchInput";
import ConfirmModal from "../../Common/ConfirmModal/ConfirmModal";
import ShopFormModal from "./ShopFormModal";
import CustomButton from "../../Common/custombutton/CustomButton";
import useShopList from "./useShopList";
import { Shop as ShopType } from "../../../types/shopTypes";

const columns: ColumnDef<ShopType>[] = [
  { key: "shopId", label: "Shop ID" },
  { key: "name", label: "Shop Name" },
  { key: "type", label: "Type", render: (row) => <span className="default-status req-submit">{row.type}</span> },
  { key: "location", label: "Location" },
  { key: "distance", label: "Distance" },
  {
    key: "actions",
    label: "Actions",
    render: () => null,
  },
];

const Shop = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editShop, setEditShop] = useState<ShopType | null>(null);

  const openCreate = () => { setEditShop(null); setModalOpen(true); };
  const openEdit = (shop: ShopType) => { setEditShop(shop); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditShop(null); };

  const {
    shops,
    pagination,
    loading,
    handleSearch,
    handlePageChange,
    refresh,
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleDeleteConfirm,
  } = useShopList();

  const columnsWithActions: ColumnDef<ShopType>[] = [
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
        <h5>Shop Management</h5>
      </div> */}

      <div className="dashboard-title pt-[10px]">
        <h2>Shops</h2>
        <CustomButton
          label="Create Shop"
          variant="contained"
          icon={<IoAddOutline size={16} />}
          onClick={openCreate}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
        <SearchInput
          placeholder="Search by shop name, location..."
          onSearch={handleSearch}
        />
      </div>

      <DataTable<ShopType>
        columns={columnsWithActions}
        rows={shops}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No shops found. Try a different search."
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Shop?"
        description={deleteTarget ? `"${deleteTarget.name}" will be permanently removed.` : ""}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        variant="danger"
        icon={<IoTrashOutline />}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <ShopFormModal
        open={modalOpen}
        onClose={closeModal}
        onSaved={refresh}
        editShop={editShop}
      />
    </div>
  );
};

export default Shop;