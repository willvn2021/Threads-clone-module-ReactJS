import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup
        .string()
        .required("Vui lòng nhập tên hiển thị")
        .min(3, "Tên hiển thị phải có ít nhất 3 ký tự")
        .max(30, "Tên hiển thị không quá 30 ký tự")
        .matches(
            /^[a-zA-Z0-9_]+$/,
            "Tên hiển thị chỉ được chứa chữ cái, số và dấu gạch dưới"
        ),
    email: yup.string().required("Vui lòng nhập email"),
    // .email("Email không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    password_confirmation: yup.string().required("Vui lòng xác nhận mật khẩu"),
});
