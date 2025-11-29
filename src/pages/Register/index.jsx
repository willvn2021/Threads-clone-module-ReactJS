import RegisterForm from "@/features/auth/components/RegisterForm";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import SocialButton from "@/components/common/SocialButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const RegisterPage = () => {
    return (
        <div className="w-full max-w-[370px] mx-auto space-y-6">
            {/* Card */}
            <div>
                <h1 className="text-center text-base sm:text-lg font-normal text-foreground mb-6">
                    Đăng ký tài khoản Instagram
                </h1>

                {/* Form đăng ký */}
                <RegisterForm />

                {/* Separator */}
                <div className="relative my-6">
                    <Separator className="bg-separator" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-foreground-tertiary">
                        hoặc
                    </span>
                </div>

                {/* Button đăng nhập Instagram */}
                <SocialButton icon={Instagram}>
                    Tiếp tục bằng Instagram
                </SocialButton>
            </div>

            {/* Card đăng nhập */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 text-center">
                <p className="text-sm text-foreground-secondary">
                    Bạn đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="text-foreground font-semibold hover:underline"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
