import axiosInstance from "@/lib/axios";

export const authService = {
    //login
    login: async (credentials) => {
        const response = await axiosInstance.post("/api/auth/login", {
            login: credentials.username,
            password: credentials.password,
        });
        return response.data.data;
    },

    //register
    register: async (userData) => {
        const response = await axiosInstance.post("/api/auth/register", {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.password_confirmation,
        });

        return response.data;
    },

    //check username đã tồn tại?
    validateUsername: async (username) => {
        const response = await axiosInstance.post(
            "/api/auth/validate/username",
            { username }
        );
        return response.data;
    },

    //check email đã tồn tại?
    validateEmail: async (email) => {
        const response = await axiosInstance.post("/api/auth/validate/email", {
            email,
        });
        return response.data;
    },

    //forgot password
    forgotPassword: async (email) => {
        const response = await axiosInstance.post("/api/auth/forgot-password", {
            email: email,
        });

        return response.data;
    },

    //Validate reset password token
    validateResetToken: async (token, email) => {
        const response = await axiosInstance.get(
            "api/auth/reset-password/validate",
            {
                params: { token, email },
            }
        );

        return response.data;
    },

    //Reset Password
    resetPassword: async (data) => {
        const response = await axiosInstance.post("/api/auth/reset-password", {
            token: data.token,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        });

        return response.data;
    },

    //Get current user (verify token)
    getCurrentUser: async () => {
        const response = await axiosInstance.get("/api/auth/me");
        return response.data;
    },
};
