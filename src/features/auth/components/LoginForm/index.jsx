import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { authService } from "../../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    loginStart,
    loginSuccess,
    loginFailure,
    selectLoginLoading,
} from "../../authSlice";
import { PasswordInput } from "@/components/ui/password-input";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector(selectLoginLoading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onBlur", //Validate khi bluer ra ngoài
    });

    const onSubmit = async (data) => {
        dispatch(loginStart());

        try {
            const response = await authService.login(data);
            console.log("API response:", response);

            //Lưu token vào localStorage
            if (response.access_token) {
                localStorage.setItem("access_token", response.access_token);
            }
            if (response.refresh_token) {
                localStorage.setItem("refresh_token", response.refresh_token);
            }
            //Lưu user vào localStorage để restore khi F5
            if (response.user) {
                localStorage.setItem("user", JSON.stringify(response.user));
            }

            dispatch(loginSuccess(response));

            //Hiển thị toast
            toast.success("Đăng nhập thành công !", {
                description: `Chào mừng ${response.user.username}`,
            });

            //Chuyển trang sau 1
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            dispatch(loginFailure(errorMessage));

            //Toast lỗi
            toast.error("Đăng nhập thất bại", {
                description: errorMessage,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Input: Tên người dùng hoặc Email */}
            <div>
                <Input
                    type="text"
                    placeholder="Tên người dùng hoặc email"
                    {...register("username")}
                    className={`
                        h-12
                        bg-background
                        border-input-border
                        rounded-2xl
                        text-foreground
                        placeholder:text-foreground-tertiary
                        ${errors.username ? "border-destructive" : ""}
                        `}
                    disabled={isLoading}
                />
                {errors.username && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.username.message}
                    </p>
                )}
            </div>

            {/* Input: Mật khẩu */}
            <div>
                <PasswordInput
                    placeholder="Mật khẩu"
                    {...register("password")}
                    className={`
                        h-12
                        bg-background
                        border-input-border
                        rounded-xl
                        text-foreground
                        placeholder:text-foreground-tertiary
                        ${errors.password ? "border-destructive" : ""}
                        `}
                    disabled={isLoading}
                />
                {errors.password && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Button đăng nhập */}
            <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold"
                disabled={isLoading}
            >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
        </form>
    );
};
export default LoginForm;
