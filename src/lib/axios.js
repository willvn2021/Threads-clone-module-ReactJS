import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

//Thêm Token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Xử lý lỗi chung Interceptors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //Nếu token hết hạn (401 và chưa retry)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");

                if (!refreshToken) {
                    throw new error("No refresh token available");
                }

                console.log("Refreshing token...");

                //Gọi api refresh token
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
                    { refresh_token: refreshToken }
                );

                const newAccessToken =
                    response.data.data?.access_token ||
                    response.data.access_token;
                const newRefreshToken =
                    response.data.data?.refresh_token ||
                    response.data.refresh_token;

                //Lưu vào localStorage
                localStorage.setItem("access_token", newAccessToken);
                if (newRefreshToken) {
                    localStorage.setItem("refresh_token", newRefreshToken);
                }

                console.log("Token Refresh thành công !");

                //Retry request cũ với token mới
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token thất bại", refreshError);

                //Refresh token hết hạn thì cho logout
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");

                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
