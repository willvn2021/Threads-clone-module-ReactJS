import LoginForm from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SocialButton from "@/components/common/SocialButton";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div className="w-full max-w-[370px] mx-auto space-y-6">
            {message && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <p className="text-sm text-green-800 dark:text-green-200 text-center">
                        {message}
                    </p>
                </div>
            )}
            {/* Card */}
            <div>
                <h1 className="text-center text-base sm:text-lg sm:my-4 font-normal text-foreground">
                    Đăng nhập bằng tài khoản Instagram
                </h1>

                {/* Form đăng nhập */}
                <LoginForm />

                {/* Link Quên mật khẩu */}
                <div className="text-center">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-foreground-secondary hover:text-foreground"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                {/* Separator */}
                <div className="relative mt-6">
                    <Separator className="bg-separator" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-foreground-tertiary">
                        hoặc
                    </span>
                </div>

                {/* Button đăng nhập Instagram (optional) */}

                <div className="w-full h-12 rounded-xl border-border hover:bg-secondary mt-4">
                    <SocialButton icon={Instagram}>
                        Tiếp tục bằng Instagram
                    </SocialButton>
                </div>
            </div>

            {/* Card đăng ký */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 text-center">
                <p className="text-sm text-foreground-secondar">
                    Bạn chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="text-foreground font-semibold hover:underline"
                    >
                        Đăng ký
                    </Link>
                </p>
            </div>

            {/* QR Code - Bottom Right */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-10">
                <p className="text-xs text-foreground-tertiary text-right">
                    Quét để tải ứng dụng
                </p>
                <div className="bg-white p-3 rounded-xl border border-border shadow-sm">
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* QR Code Pattern */}
                        <rect width="120" height="120" fill="white" />
                        {/* Top-left corner square */}
                        <rect
                            x="10"
                            y="10"
                            width="30"
                            height="30"
                            fill="black"
                        />
                        <rect
                            x="15"
                            y="15"
                            width="20"
                            height="20"
                            fill="white"
                        />
                        <rect
                            x="20"
                            y="20"
                            width="10"
                            height="10"
                            fill="black"
                        />
                        {/* Top-right corner square */}
                        <rect
                            x="80"
                            y="10"
                            width="30"
                            height="30"
                            fill="black"
                        />
                        <rect
                            x="85"
                            y="15"
                            width="20"
                            height="20"
                            fill="white"
                        />
                        <rect
                            x="90"
                            y="20"
                            width="10"
                            height="10"
                            fill="black"
                        />
                        {/* Bottom-left corner square */}
                        <rect
                            x="10"
                            y="80"
                            width="30"
                            height="30"
                            fill="black"
                        />
                        <rect
                            x="15"
                            y="85"
                            width="20"
                            height="20"
                            fill="white"
                        />
                        <rect
                            x="20"
                            y="90"
                            width="10"
                            height="10"
                            fill="black"
                        />
                        {/* Data modules */}
                        <rect x="50" y="10" width="5" height="5" fill="black" />
                        <rect x="60" y="10" width="5" height="5" fill="black" />
                        <rect x="70" y="10" width="5" height="5" fill="black" />
                        <rect x="10" y="50" width="5" height="5" fill="black" />
                        <rect x="20" y="50" width="5" height="5" fill="black" />
                        <rect x="30" y="50" width="5" height="5" fill="black" />
                        <rect x="50" y="50" width="5" height="5" fill="black" />
                        <rect x="60" y="50" width="5" height="5" fill="black" />
                        <rect x="70" y="50" width="5" height="5" fill="black" />
                        <rect x="80" y="50" width="5" height="5" fill="black" />
                        <rect x="90" y="50" width="5" height="5" fill="black" />
                        <rect
                            x="100"
                            y="50"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect x="50" y="60" width="5" height="5" fill="black" />
                        <rect x="70" y="60" width="5" height="5" fill="black" />
                        <rect x="90" y="60" width="5" height="5" fill="black" />
                        <rect
                            x="100"
                            y="60"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect x="50" y="70" width="5" height="5" fill="black" />
                        <rect x="60" y="70" width="5" height="5" fill="black" />
                        <rect x="70" y="70" width="5" height="5" fill="black" />
                        <rect x="80" y="70" width="5" height="5" fill="black" />
                        <rect
                            x="100"
                            y="70"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect x="10" y="60" width="5" height="5" fill="black" />
                        <rect x="30" y="60" width="5" height="5" fill="black" />
                        <rect x="10" y="70" width="5" height="5" fill="black" />
                        <rect x="20" y="70" width="5" height="5" fill="black" />
                        <rect x="30" y="70" width="5" height="5" fill="black" />
                        <rect x="50" y="80" width="5" height="5" fill="black" />
                        <rect x="60" y="80" width="5" height="5" fill="black" />
                        <rect x="70" y="80" width="5" height="5" fill="black" />
                        <rect x="80" y="80" width="5" height="5" fill="black" />
                        <rect x="90" y="80" width="5" height="5" fill="black" />
                        <rect
                            x="100"
                            y="80"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect x="50" y="90" width="5" height="5" fill="black" />
                        <rect x="70" y="90" width="5" height="5" fill="black" />
                        <rect x="90" y="90" width="5" height="5" fill="black" />
                        <rect
                            x="100"
                            y="90"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="50"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="60"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="70"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="80"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="90"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                        <rect
                            x="100"
                            y="100"
                            width="5"
                            height="5"
                            fill="black"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
