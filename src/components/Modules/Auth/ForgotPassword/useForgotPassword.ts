import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthApi from "../../../../service/apis/Auth.api";
import { ForgotPasswordRequest } from "../../../../types/authTypes";

interface FormValues extends ForgotPasswordRequest {}

const initialValues: FormValues = {
    email: "",
};

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

const useForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formMethods = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(forgotPasswordSchema) as any,
        mode: "onTouched",
    });

    const { handleSubmit } = formMethods;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await AuthApi.forgotPassword(data);
            if (response.success || response.code === 200) {
                toast.success(response.message || "Reset link sent to your email");
                navigate("/login");
            } else {
                toast.error(response.message || "Failed to send reset link");
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formMethods,
        loading,
        onSubmit: handleSubmit(onSubmit),
    };
};

export default useForgotPassword;
