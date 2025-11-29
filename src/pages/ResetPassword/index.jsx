import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authService } from "@/features/auth/services/authService";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [isValidating, setIsValidating] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const validateToken = async () => {
            //Check email và token có tồn tại
            if (!token || !email) {
                setErrorMessage("Liên kết không hợp lệ!");
                setIsValidating(false);
                return;
            }

            try {
                await authService.validateResetToken(token, email);
                setIsValidToken(true);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    "Liên kết đã hết hạn hoặc không hợp lệ";

                setErrorMessage(message);
                setIsValidToken(false);
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token, email]);

    //Nếu đang check token
    if (isValidating) {
        return (
            <div className="w-full max-w-[370px] mx-auto space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-foreground mb-4" />
                    <p className="text-foreground-secondary">
                        Đang xác thực liên kết...
                    </p>
                </div>
            </div>
        );
    }

    // Token không hợp lệ
    if (!isValidToken) {
        return (
            <div className="w-full max-w-[370px] mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-lg font-semibold text-foreground mb-4">
                        Liên kết không hợp lệ
                    </h1>
                    <p className="text-sm text-destructive mb-6">
                        {errorMessage}
                    </p>
                    <Link to="/forgot-password">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-xl border-border hover:bg-secondary"
                        >
                            Yêu cầu liên kết mới
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[370px] mx-auto space-y-6">
            <div>
                <h1 className="text-center text-base sm:text-lg font-normal text-foreground mb-6">
                    Tạo mật khẩu mới
                </h1>

                <p className="text-center text-sm text-foreground-secondary mb-6">
                    Nhập mật khẩu mới cho tài khoản của bạn
                </p>

                {/* Form reset password */}
                <ResetPasswordForm token={token} email={email} />
            </div>
        </div>
    );
};
export default ResetPasswordPage;
