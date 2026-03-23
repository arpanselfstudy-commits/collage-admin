export type CmsType =
  | "TERMS_AND_CONDITIONS"
  | "PRIVACY_POLICY"
  | "ABOUT_US"
  | "FAQ"
  | "CONTACT_US";

export interface CmsItem {
  _id: string;
  cmsId: string;
  type: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CmsListResponse {
  code: number;
  success: boolean;
  message: string;
  data: CmsItem[];
}

export interface CmsResponse {
  code: number;
  success: boolean;
  message: string;
  data: CmsItem;
}

export interface CmsPayload {
  type: string;
  title: string;
  content: string;
  isActive: boolean;
}
