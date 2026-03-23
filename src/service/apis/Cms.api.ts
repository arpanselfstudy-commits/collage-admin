import httpsCall from "../httpsCall";
import { CmsListResponse, CmsResponse, CmsPayload } from "../../types/cmsTypes";

const CmsApi = {
  getAll: (): Promise<CmsListResponse> =>
    httpsCall.get("/cms") as unknown as Promise<CmsListResponse>,

  getByType: (type: string): Promise<CmsResponse> =>
    httpsCall.get(`/cms/${type}`) as unknown as Promise<CmsResponse>,

  create: (data: CmsPayload): Promise<CmsResponse> =>
    httpsCall.post("/cms", data) as unknown as Promise<CmsResponse>,

  update: (type: string, data: CmsPayload): Promise<CmsResponse> =>
    httpsCall.put(`/cms/${type}`, data) as unknown as Promise<CmsResponse>,

  delete: (type: string): Promise<{ code: number; success: boolean; message: string }> =>
    httpsCall.delete(`/cms/${type}`) as unknown as Promise<{ code: number; success: boolean; message: string }>,
};

export default CmsApi;
