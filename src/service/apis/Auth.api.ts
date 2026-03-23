import httpsCall from "../httpsCall";
import {
    LoginRequest,
    RefreshRequest,
    LogoutRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    AuthResponse,
    ForgotPasswordResponse,
    ResetPasswordResponse,
} from "../../types/authTypes";

const AuthApi = {
    login: (data: LoginRequest): Promise<AuthResponse> =>
        httpsCall.post("/auth/login", data) as unknown as Promise<AuthResponse>,

    refresh: (data: RefreshRequest): Promise<AuthResponse> =>
        httpsCall.post("/auth/refresh", data),

    logout: (data: LogoutRequest): Promise<any> =>
        httpsCall.post("/auth/logout", data),

    forgotPassword: (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> =>
        httpsCall.post("/auth/forgot-password", data),

    resetPassword: (token: string, data: ResetPasswordRequest): Promise<ResetPasswordResponse> =>
        httpsCall.post(`/auth/reset-password/${token}`, data),
};

export default AuthApi;
