import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ForgotPasswordPage = () => {
    return (
        <div className="w-full max-w-[370px] mx-auto space-y-6">
            {/* Card */}
            <div>
                <h1 className="text-center text-base sm:text-lg font-normal text-foreground mb-6">
                    Quên mật khẩu
                </h1>

                <p className="text-center text-sm text-foreground-secondary mb-6">
                    Nhập email của bạn để nhận link đặt lại mật khẩu
                </p>

                {/* Form quên mật khẩu */}
                <ForgotPasswordForm />

                {/* Separator */}
                <div className="relative my-6">
                    <Separator className="bg-separator" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-foreground-tertiary">
                        hoặc
                    </span>
                </div>

                {/* Button quay lại đăng nhập */}
                <Link to="/login">
                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl border-border hover:bg-foreground transition-colors"
                    >
                        Quay lại đăng nhập
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
