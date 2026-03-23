import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import CmsApi from "../../../service/apis/Cms.api";
import { CmsItem } from "../../../types/cmsTypes";

export const CMS_TYPES = [
  { value: "TERMS_AND_CONDITIONS", label: "Terms & Conditions" },
  { value: "PRIVACY_POLICY", label: "Privacy Policy" },
  { value: "ABOUT_US", label: "About Us" },
  { value: "FAQ", label: "FAQ" },
  { value: "CONTACT_US", label: "Contact Us" },
];

export interface CmsFormValues {
  type: string;
  title: string;
  content: string;
  isActive: boolean;
}

const schema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  title: Yup.string().trim().required("Title is required"),
  content: Yup.string()
    .required("Content is required")
    .test("not-empty-html", "Content is required", (val) => {
      if (!val) return false;
      const stripped = val.replace(/<[^>]*>/g, "").trim();
      return stripped.length > 0;
    }),
  isActive: Yup.boolean().default(true),
});

const emptyDefaults: CmsFormValues = {
  type: "TERMS_AND_CONDITIONS",
  title: "",
  content: "",
  isActive: true,
};

const itemToFormValues = (item: CmsItem): CmsFormValues => ({
  type: item.type,
  title: item.title,
  content: item.content,
  isActive: item.isActive,
});

const useCmsForm = (onSuccess: () => void, editItem?: CmsItem | null) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!editItem;

  const formMethods = useForm<CmsFormValues>({
    defaultValues: editItem ? itemToFormValues(editItem) : emptyDefaults,
    resolver: yupResolver(schema) as any,
    mode: "onTouched",
  });

  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    reset(editItem ? itemToFormValues(editItem) : emptyDefaults);
  }, [editItem]);

  const onSubmit: SubmitHandler<CmsFormValues> = async (data) => {
    setLoading(true);
    try {
      const payload = { type: data.type, title: data.title, content: data.content, isActive: data.isActive };

      if (isEdit && editItem) {
        const res = await CmsApi.update(editItem.type, payload);
        if (res.success) {
          toast.success("CMS item updated");
          reset(emptyDefaults);
          onSuccess();
        } else {
          toast.error(res.message || "Failed to update");
        }
      } else {
        const res = await CmsApi.create(payload);
        if (res.success) {
          toast.success("CMS item created");
          reset(emptyDefaults);
          onSuccess();
        } else {
          toast.error(res.message || "Failed to create");
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    formMethods,
    loading,
    isEdit,
    setValue,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useCmsForm;
