import Sidebar from "@/components/sidebar/Sidebar";
import SignUpModal from "@/features/auth/components/SignUpModal";
import {
    selectShowSignUpModal,
    closeSignUpModal,
    restoreUser,
    logout,
    selectIsAuthenticated,
    finishInitializing,
} from "@/features/auth/authSlice";
import { authService } from "@/features/auth/services/authService";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DefaultLayout = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(selectShowSignUpModal);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // Khôi phục trạng thái đăng nhập khi app khởi động
    // Chỉ chạy một lần khi component mount
    useEffect(() => {
        const initializeAuth = async () => {
            // Nếu đã authenticated rồi (vừa mới đăng nhập), skip verification
            if (isAuthenticated) {
                if (import.meta.env.DEV) {
                    console.log("User đã authenticated, skip verification");
                }
                dispatch(finishInitializing());
                return;
            }

            const token = localStorage.getItem("access_token");
            if (import.meta.env.DEV) {
                console.log(
                    "Checking token in localStorage:",
                    token ? "Token found" : "No token"
                );
            }

            // Nếu có token trong localStorage, verify với backend
            if (token) {
                try {
                    if (import.meta.env.DEV) {
                        console.log("Verifying token with backend...");
                    }
                    const response = await authService.getCurrentUser();
                    if (import.meta.env.DEV) {
                        console.log("getCurrentUser response:", response);
                    }

                    // Token hợp lệ, restore user vào Redux state
                    if (response.data) {
                        // Lưu user vào localStorage để restore khi gặp lỗi 500
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data)
                        );
                        dispatch(restoreUser(response.data));
                        if (import.meta.env.DEV) {
                            console.log(
                                " User restored to Redux state and saved to localStorage"
                            );
                        }
                    } else {
                        if (import.meta.env.DEV) {
                            console.warn("Response data is empty");
                        }
                        dispatch(finishInitializing());
                    }
                } catch (error) {
                    // CHỈ xóa token nếu là lỗi 401 (Unauthorized) - token không hợp lệ
                    if (error.response?.status === 401) {
                        if (import.meta.env.DEV) {
                            console.log(
                                "Token không hợp lệ (401), xóa khỏi localStorage"
                            );
                        }
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        localStorage.removeItem("user");
                        dispatch(logout());
                    } else {
                        // Lỗi 500 hoặc lỗi khác: Có thể là lỗi server tạm thời
                        // Restore user từ localStorage nếu có để app vẫn hoạt động
                        const savedUser = localStorage.getItem("user");
                        if (savedUser) {
                            try {
                                const userData = JSON.parse(savedUser);
                                // Chỉ log trong development mode
                                if (import.meta.env.DEV) {
                                    console.warn(
                                        `Server error (${
                                            error.response?.status || "network"
                                        }), restoring user from localStorage`
                                    );
                                }
                                dispatch(restoreUser(userData));
                                if (import.meta.env.DEV) {
                                    console.log(
                                        "User restored from localStorage"
                                    );
                                }
                            } catch (parseError) {
                                // Chỉ log lỗi nghiêm trọng
                                if (import.meta.env.DEV) {
                                    console.error(
                                        "Error parsing user from localStorage:",
                                        parseError
                                    );
                                }
                                dispatch(finishInitializing());
                            }
                        } else {
                            // Không có user trong localStorage, chỉ finish initializing
                            if (import.meta.env.DEV) {
                                console.warn(
                                    `Server error (${
                                        error.response?.status || "network"
                                    }), không có user trong localStorage`
                                );
                            }
                            dispatch(finishInitializing());
                        }
                    }
                }
            } else {
                if (import.meta.env.DEV) {
                    console.log("No token found in localStorage");
                }
                dispatch(finishInitializing());
            }
        };

        initializeAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Chỉ chạy một lần khi component mount

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main
                className={`
                ml-0 sm:ml-20 lg:ml-[104px]
                min-h-screen
                transition-all duration-300
                `}
            >
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <Outlet />
                </div>
            </main>

            {/* Modal đăng ký - Global */}
            <SignUpModal
                open={showModal}
                onOpenChange={(open) => {
                    if (!open) dispatch(closeSignUpModal());
                }}
            />
        </div>
    );
};
export default DefaultLayout;
