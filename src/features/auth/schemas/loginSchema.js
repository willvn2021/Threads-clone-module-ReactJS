import * as yup from "yup";

export const loginSchema = yup.object({
    username: yup.string().required("Vui lòng nhập tên người dùng hoặc email"),
    password: yup
        .string()
        .required("vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
