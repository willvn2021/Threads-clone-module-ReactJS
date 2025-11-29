import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/registerSchema";
import { authService } from "../../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    debounce,
    isPasswordMatch,
    isValidEmailFormat,
    isValidPassword,
} from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    registerStart,
    registerSuccess,
    registerFailure,
    selectRegisterLoading,
    resetRegisterState,
} from "../../authSlice";

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Redux state
    const isLoading = useSelector(selectRegisterLoading);

    //Local state cho validation
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    //Lưu giá trị tạm để so sánh Password
    const [passwordValue, setPasswordValue] = useState("");

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
    });

    //Debounce check username
    const checkUsername = useCallback(
        debounce(async (username) => {
            if (!username || username.length < 3) return;

            setIsCheckingUsername(true);
            try {
                await authService.validateUsername(username);
                clearErrors("username");
            } catch (error) {
                setError("username", {
                    type: "manual",
                    message:
                        error.response?.data?.message ||
                        "Tên hiển thị đã tồn tại",
                });
            } finally {
                setIsCheckingUsername(false);
            }
        }, 700),
        []
    );

    //Debounce check email đúng format + Check API
    const checkEmail = useCallback(
        debounce(async (email) => {
            //Kiểm tra format chuẩn của email
            if (!email) {
                setEmailFormatError("");
                return;
            }
            //Nếu chưa đủ format thì hiển thị ra lỗi
            if (!isValidEmailFormat(email)) {
                setEmailFormatError("Email không đúng định dạng");
                clearErrors("email");
                return;
            }
            //Đúng format rồi thì xóa lỗi rồi check API
            setEmailFormatError("");
            setIsCheckingEmail(true);

            try {
                await authService.validateEmail(email);
                clearErrors("email");
            } catch (error) {
                setError("email", {
                    type: "manual",
                    message:
                        error.response?.data?.message || "Email đã tồn tại",
                });
            } finally {
                setIsCheckingEmail(false);
            }
        }, 1200),
        []
    );

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

    //Handle submit
    const onSubmit = async (data) => {
        //Dispatch action bắt đầu register
        dispatch(registerStart());

        try {
            const response = await authService.register(data);

            //Lưu token vào localStorage
            if (response.access_token) {
                localStorage.setItem("access_token", response.access_token);
            }
            if (response.refresh_token) {
                localStorage.setItem("refresh_token", response.refresh_token);
            }

            //Dispatch action thành công
            dispatch(registerSuccess(response));

            //Hiển thị toast thành công
            toast.success("Đăng ký thành công !", {
                description:
                    "Chúng tôi đã gửi một liên kết xác thực tới email của bạn. Vui lòng kiểm tra email để xác thực tài khoản.",
                duration: 5000,
            });

            //Chuyển hướng 2s
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            //Dispatch action fail
            const errorData = error.response?.data || {
                message: error.message,
            };
            dispatch(registerFailure(errorData));

            const errorMessage = errorData.message || "Đăng ký thất bại";

            //Kiểm tra lỗi cụ thể từ response
            if (errorData.errors) {
                Object.keys(errorData.errors).forEach((field) => {
                    setError(field, {
                        type: "manual",
                        message: errorData.errors[field][0],
                    });
                });
            }

            toast.error("Đăng ký thất bại", {
                description: errorMessage,
            });
        }
    };

    //Reset state khi component unmount
    useEffect(() => {
        return () => {
            dispatch(resetRegisterState());
        };
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* username - Tên hiển thị */}
            <div>
                <Input
                    type="text"
                    placeholder="Tên Hiển thị"
                    {...register("username")}
                    onChange={(e) => {
                        register("username").onChange(e);
                        checkUsername(e.target.value);
                    }}
                    className={`h-12 bg-background border-input-border rounded-xl text-foreground placeholder:text-foreground-tertiary ${
                        errors.username ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                />
                {isCheckingUsername && (
                    <p className="text-muted-foreground text-sm mt-1">
                        Đang kiểm tra...
                    </p>
                )}
                {errors.username && !isCheckingUsername && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.username.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    onChange={(e) => {
                        register("email").onChange(e);
                        checkEmail(e.target.value);
                    }}
                    className={`h-12 bg-background border-input-border rounded-xl text-foreground placeholder:text-foreground-tertiary ${
                        errors.email || emailFormatError
                            ? "border-destructive"
                            : ""
                    }`}
                    disabled={isLoading}
                />
                {isCheckingEmail && (
                    <p className="text-muted-foreground text-sm mt-1">
                        Đang kiểm tra
                    </p>
                )}
                {/* Hiển thị lỗi format (debounced) */}
                {emailFormatError && !isCheckingEmail && (
                    <p className="text-destructive text-sm mt-1">
                        {emailFormatError}
                    </p>
                )}

                {/* Hiển thị lỗi từ API */}
                {errors.email && !isCheckingEmail && !emailFormatError && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <Input
                    type="password"
                    placeholder="Mật Khẩu"
                    {...register("password")}
                    onChange={(e) => {
                        const value = e.target.value;
                        register("password").onChange(e);
                        setPasswordValue(value); //Lưu lại pass để so sánh
                        checkPassword(value);
                    }}
                    className={`h-12 bg-background border-input-border rounded-xl text-foreground placeholder:text-foreground-tertiary ${
                        errors.password || passwordError
                            ? "border-destructive"
                            : ""
                    }`}
                    disabled={isLoading}
                />
                {/* Lỗi debounce password ở đây */}
                {passwordError && (
                    <p className="text-destructive text-sm mt-1">
                        {passwordError}
                    </p>
                )}

                {/* Hiển thị lỗi từ API */}
                {errors.password && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <Input
                    type="password"
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
                {/* Lỗi debounce hiển thị ở đây */}
                {confirmPasswordError && (
                    <p className="text-destructive text-sm mt-1">
                        {confirmPasswordError}
                    </p>
                )}

                {/* Hiển thị lỗi từ API */}
                {errors.password_confirmation && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password_confirmation.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold"
                disabled={isLoading || isCheckingUsername || isCheckingEmail}
            >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
        </form>
    );
};

export default RegisterForm;
