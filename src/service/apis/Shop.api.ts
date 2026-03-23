import httpsCall from "../httpsCall";
import {
  ShopsListResponse,
  ShopResponse,
  ShopListParams,
  CreateShopPayload,
  UpdateShopPayload,
} from "../../types/shopTypes";

const ShopApi = {
  getShops: (params: ShopListParams): Promise<ShopsListResponse> =>
    httpsCall.get("/shops", { params }) as unknown as Promise<ShopsListResponse>,

  getShop: (shopId: string): Promise<ShopResponse> =>
    httpsCall.get(`/shops/${shopId}`) as unknown as Promise<ShopResponse>,

  createShop: (data: CreateShopPayload): Promise<ShopResponse> =>
    httpsCall.post("/shops", data) as unknown as Promise<ShopResponse>,

  updateShop: (shopId: string, data: UpdateShopPayload): Promise<ShopResponse> =>
    httpsCall.put(`/shops/${shopId}`, data) as unknown as Promise<ShopResponse>,

  deleteShop: (shopId: string): Promise<{ code: number; success: boolean; message: string }> =>
    httpsCall.delete(`/shops/${shopId}`) as unknown as Promise<{ code: number; success: boolean; message: string }>,
};

export default ShopApi;
