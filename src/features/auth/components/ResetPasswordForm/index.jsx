import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schemas/resetPasswordSchema";
import { authService } from "../../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce, isPasswordMatch, isValidPassword } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";

const ResetPasswordForm = ({ token, email }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    //Local State
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onChange",
    });

    //Debounce check password
    const checkPassword = useCallback(
        debounce((password) => {
            if (!password) {
                setPasswordError("");
                return;
            }

            if (!isValidPassword(password)) {
                setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
                clearErrors("password");
            } else {
                setPasswordError("");
            }
        }, 700),
        []
    );

    //Debounce check confirm_password
    const checkConfirmPassword = useCallback(
        debounce((confirmPassword) => {
            if (!confirmPassword) {
                setConfirmPasswordError("");
                return;
            }

            if (!isPasswordMatch(passwordValue, confirmPassword)) {
                setConfirmPasswordError("Mật khẩu xác nhận không khớp");
                clearErrors("password_confirmation");
            } else {
                setConfirmPasswordError("");
            }
        }, 700),
        [passwordValue]
    );

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await authService.resetPassword({
                token,
                email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            //Toast
            toast.success("Tạo mật khẩu mới thành công", {
                description: "Vui lòng đăng nhập với mật khẩu mới",
            });

            //Chuyển hướng login
            setTimeout(() => {
                navigate("/login", {
                    state: {
                        message:
                            "Tạo mật khẩu mới thành công, vui lòng đăng nhập",
                    },
                });
            }, 1500);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Không thể đặt lại mật khẩu";

            toast.error("Đặt lại mật khẩu thất bại", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Password */}
            <div>
                <PasswordInput
                    placeholder="Mật khẩu mới"
                    {...register("password")}
                    onChange={(e) => {
                        const value = e.target.value;
                        register("password").onChange(e);
                        setPasswordValue(value);
                        checkPassword(value);
                    }}
                    className={`h-12 bg-background border-input-border rounded-xl text-foreground placeholder:text-foreground-tertiary ${
                        errors.password || passwordError
                            ? "border-destructive"
                            : ""
                    }`}
                    disabled={isLoading}
                />
                {passwordError && (
                    <p className="text-destructive text-sm mt-1">
                        {passwordError}
                    </p>
                )}
                {errors.password && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <PasswordInput
                    placeholder="Xác nhận mật khẩu"
                    {...register("password_confirmation")}
                    onChange={(e) => {
                        register("password_confirmation").onChange(e);
                        checkConfirmPassword(e.target.value);
                    }}
                    className={`h-12 bg-background border-input-border rounded-xl text-foreground placeholder:text-foreground-tertiary ${
                        errors.password_confirmation || confirmPasswordError
                            ? "border-destructive"
                            : ""
                    }`}
                    disabled={isLoading}
                />
                {confirmPasswordError && (
                    <p className="text-destructive text-sm mt-1">
                        {confirmPasswordError}
                    </p>
                )}
                {errors.password_confirmation && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password_confirmation.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold"
                disabled={isLoading}
            >
                {isLoading ? "Đang xử lý..." : "Tạo mật khẩu mới"}
            </Button>
        </form>
    );
};
export default ResetPasswordForm;
