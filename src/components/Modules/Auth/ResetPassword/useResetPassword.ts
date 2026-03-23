import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AuthApi from "../../../../service/apis/Auth.api";
import { ResetPasswordRequest } from "../../../../types/authTypes";

interface FormValues extends ResetPasswordRequest {
    confirmPassword: string;
}

const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
};

const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
});

const useResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const resetToken = searchParams.get("token");

    const formMethods = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(resetPasswordSchema) as any,
        mode: "onTouched",
    });

    const { handleSubmit } = formMethods;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!resetToken) {
            toast.error("Invalid or missing reset token");
            return;
        }
        setLoading(true);
        try {
            const response = await AuthApi.resetPassword(resetToken, {
                password: data.password,
            });
            if (response.success || response.code === 200) {
                toast.success("Password reset successfully");
                navigate("/login");
            } else {
                toast.error(response.message || "Failed to reset password");
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
        resetToken,
    };
};

export default useResetPassword;
