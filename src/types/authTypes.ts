export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface LogoutRequest {
    refreshToken: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    password: string;
}

export interface ForgotPasswordResponse {
    code: number;
    success: boolean;
    message: string;
}

export interface ResetPasswordResponse {
    code: number;
    success: boolean;
    message: string;
}

export interface AuthResponse {
    code: number;
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: any;
    };
}


