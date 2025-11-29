# Code Patterns - Threads Project

> **Dành cho người mới học React**
>
> Document này được tạo ra để hướng dẫn cách tổ chức code cho dự án clone giao diện Threads.
> Mục đích: Luyện tập và ôn luyện kiến thức React, lắp ghép các mảng kiến thức đã học.
>
> **Cách sử dụng:**
> - Đọc code examples để hiểu cách hoạt động
> - Tự gõ lại code (KHÔNG copy/paste) để học hiệu quả
> - Giải thích đơn giản, dễ hiểu cho người mới
> - Không overthinking, làm đúng những gì yêu cầu

---

## 🎯 Mục tiêu học tập

Project này giúp bạn thực hành:

1. ✅ **React Hooks** - useState, useEffect, useCallback
2. ✅ **React Hook Form** - Quản lý form hiệu quả
3. ✅ **Redux Toolkit** - Quản lý global state (không dùng Thunk)
4. ✅ **Axios** - Gọi API với interceptors
5. ✅ **React Router** - Điều hướng giữa các trang
6. ✅ **Yup Validation** - Validate dữ liệu form
7. ✅ **Debounce Technique** - Tối ưu performance khi gọi API
8. ✅ **Tailwind CSS + Shadcn UI** - Styling components
9. ✅ **Feature-based Architecture** - Tổ chức code chuẩn chuyên nghiệp

---

## 📁 Cấu trúc dự án

```
src/
├── features/              # Feature-based architecture
│   ├── auth/
│   │   ├── components/   # UI Components (RegisterForm, LoginForm, etc.)
│   │   ├── services/     # API calls (authService.js)
│   │   ├── schemas/      # Yup validation schemas
│   │   └── authSlice.js  # Redux state management
│   └── post/
│       ├── components/
│       ├── services/
│       └── postSlice.js
├── components/           # Shared components
│   ├── ui/              # Shadcn UI components
│   ├── common/          # Custom shared components
│   └── sidebar/
├── lib/                 # Utilities
│   ├── axios.js         # Axios instance với interceptors
│   └── utils.js         # Helper functions (debounce, validation)
├── pages/               # Route pages (chỉ layout + import components)
├── routes/              # Route configuration
└── app/                 # Redux store
```

---

## ⚙️ Cấu hình Alias Import `@`

### Tại sao dùng `@`?

Thay vì import dài dòng:
```javascript
import { Button } from "../../../../components/ui/button";
import { authService } from "../../../services/authService";
```

Dùng `@` ngắn gọn hơn:
```javascript
import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/authService";
```

### Cấu hình trong Vite

**File: `vite.config.js`**

```javascript
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
```

**Giải thích:**
- `@` sẽ trỏ đến thư mục `src/`
- `@/components` = `src/components`
- `@/lib/utils` = `src/lib/utils`

### Cách sử dụng

| Import path với @ | Tương đương |
|-------------------|-------------|
| `@/components/ui/button` | `src/components/ui/button` |
| `@/lib/utils` | `src/lib/utils` |
| `@/lib/axios` | `src/lib/axios` |
| `@/features/auth/authSlice` | `src/features/auth/authSlice` |
| `@/features/auth/services/authService` | `src/features/auth/services/authService` |

### Ví dụ Import trong Component

```javascript
// ❌ KHÔNG NÊN - Import dài, khó maintain
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { debounce } from "../../lib/utils";
import { authService } from "../services/authService";
import { registerStart } from "../authSlice";

// ✅ NÊN - Dùng alias @, ngắn gọn rõ ràng
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { authService } from "@/features/auth/services/authService";
import { registerStart } from "@/features/auth/authSlice";
```

### Quy tắc Import

**1. Thứ tự import (từ trên xuống dưới):**
```javascript
// 1. React và libraries bên ngoài
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// 2. Alias @ - Components UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 3. Alias @ - Lib/utils
import { debounce, isValidEmailFormat } from "@/lib/utils";

// 4. Alias @ - Features (services, schemas)
import { authService } from "@/features/auth/services/authService";
import { registerSchema } from "@/features/auth/schemas/registerSchema";

// 5. Relative imports trong cùng feature (nếu có)
import { loginStart, loginSuccess } from "../../authSlice";
```

**2. Khi nào dùng `@` vs relative path?**

| Tình huống | Dùng gì | Ví dụ |
|------------|---------|-------|
| Import từ `components/ui` | `@/` | `@/components/ui/button` |
| Import từ `lib` | `@/` | `@/lib/utils` |
| Import từ feature khác | `@/` | `@/features/post/postSlice` |
| Import trong cùng folder | `./` | `./LoginForm` |
| Import từ parent folder (cùng feature) | `../` hoặc `../../` | `../../authSlice` |

**Lưu ý:** Ưu tiên dùng `@/` để dễ refactor code sau này!

---

## 🎯 Patterns đã áp dụng

### 1. Form với Debounce Validation

**Stack:**
- React Hook Form + Yup
- Redux (state management - không dùng Thunk)
- Axios (API calls với interceptors)
- Debounce validation (700-1200ms)

**Files cần tạo:**
1. `schemas/[feature]Schema.js` - Validation rules (chỉ `required()`)
2. `services/[feature]Service.js` - API methods
3. `[feature]Slice.js` - Redux actions/selectors
4. `components/[Feature]Form/index.jsx` - Form component

---

### 2. Pattern: Debounce Validation

**Ví dụ: Validate email với debounce**

```javascript
// 1. Import helpers
import { debounce, isValidEmailFormat } from "@/lib/utils";

// 2. State management
const [isCheckingEmail, setIsCheckingEmail] = useState(false);
const [emailFormatError, setEmailFormatError] = useState("");

// 3. Debounce validation function
const checkEmail = useCallback(
    debounce(async (email) => {
        // Bước 1: Kiểm tra empty
        if (!email) {
            setEmailFormatError("");
            return;
        }

        // Bước 2: Kiểm tra format
        if (!isValidEmailFormat(email)) {
            setEmailFormatError("Email không đúng định dạng");
            clearErrors("email");
            return;
        }

        // Bước 3: Check API nếu format đúng
        setEmailFormatError("");
        setIsCheckingEmail(true);

        try {
            await authService.validateEmail(email);
            clearErrors("email");
        } catch (error) {
            setError("email", {
                type: "manual",
                message: error.response?.data?.message || "Email đã tồn tại",
            });
        } finally {
            setIsCheckingEmail(false);
        }
    }, 1200), // Debounce delay
    []
);

// 4. UI Render với 3 trạng thái
<Input
    type="email"
    placeholder="Email"
    {...register("email")}
    onChange={(e) => {
        register("email").onChange(e);
        checkEmail(e.target.value);
    }}
    className={`${errors.email || emailFormatError ? "border-destructive" : ""}`}
/>

{/* Hiển thị "Đang kiểm tra..." */}
{isCheckingEmail && (
    <p className="text-muted-foreground text-sm mt-1">Đang kiểm tra</p>
)}

{/* Hiển thị lỗi format (debounced) */}
{emailFormatError && !isCheckingEmail && (
    <p className="text-destructive text-sm mt-1">{emailFormatError}</p>
)}

{/* Hiển thị lỗi từ API */}
{errors.email && !isCheckingEmail && !emailFormatError && (
    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
)}
```

**Key points:**
- ✅ Debounce để tránh gọi API liên tục
- ✅ Validate format trước khi gọi API
- ✅ 3 states: checking, format error, API error
- ✅ Priority: checking > format error > API error

---

### 3. Pattern: Redux State Management (Không dùng Thunk)

**File: `authSlice.js`**

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,

    // Pattern: [feature]Loading, [feature]Error, [feature]Success
    registerLoading: false,
    registerError: null,
    registerSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Pattern: [feature]Start, [feature]Success, [feature]Failure
        registerStart: (state) => {
            state.registerLoading = true;
            state.registerError = null;
            state.registerSuccess = false;
        },
        registerSuccess: (state, action) => {
            state.registerLoading = false;
            state.registerSuccess = true;
            state.user = action.payload.user || null;
            state.registerError = null;
        },
        registerFailure: (state, action) => {
            state.registerLoading = false;
            state.registerError = action.payload;
            state.registerSuccess = false;
        },
        // Pattern: reset[Feature]State
        resetRegisterState: (state) => {
            state.registerLoading = false;
            state.registerError = null;
            state.registerSuccess = false;
        },
    },
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    resetRegisterState,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors pattern: select[Feature][Property]
export const selectRegisterLoading = (state) => state.auth.registerLoading;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectRegisterSuccess = (state) => state.auth.registerSuccess;
```

**Sử dụng trong Component:**

```javascript
import { useDispatch, useSelector } from "react-redux";
import {
    registerStart,
    registerSuccess,
    registerFailure,
    selectRegisterLoading,
} from "../../authSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectRegisterLoading);

    const onSubmit = async (data) => {
        // Bước 1: Dispatch start
        dispatch(registerStart());

        try {
            // Bước 2: Gọi API
            const response = await authService.register(data);

            // Bước 3: Lưu tokens
            if (response.access_token) {
                localStorage.setItem("access_token", response.access_token);
            }
            if (response.refresh_token) {
                localStorage.setItem("refresh_token", response.refresh_token);
            }

            // Bước 4: Dispatch success
            dispatch(registerSuccess(response));

            // Bước 5: Toast + Navigate
            toast.success("Đăng ký thành công!");
            setTimeout(() => navigate("/login"), 2000);

        } catch (error) {
            // Bước 6: Dispatch failure
            const errorData = error.response?.data || { message: error.message };
            dispatch(registerFailure(errorData));

            // Bước 7: Xử lý lỗi chi tiết
            if (errorData.errors) {
                Object.keys(errorData.errors).forEach((field) => {
                    setError(field, {
                        type: "manual",
                        message: errorData.errors[field][0],
                    });
                });
            }

            toast.error("Đăng ký thất bại", {
                description: errorData.message,
            });
        }
    };
};
```

---

### 4. Pattern: API Service

**File: `services/authService.js`**

```javascript
import axiosInstance from "@/lib/axios";

export const authService = {
    // Pattern: Tên hàm rõ ràng, async/await, return response.data
    register: async (userData) => {
        const response = await axiosInstance.post("/api/auth/register", {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.password_confirmation,
        });
        return response.data;
    },

    validateUsername: async (username) => {
        const response = await axiosInstance.post(
            "/api/auth/validate/username",
            { username }
        );
        return response.data;
    },

    validateEmail: async (email) => {
        const response = await axiosInstance.post(
            "/api/auth/validate/email",
            { email }
        );
        return response.data;
    },
};
```

**Key points:**
- ✅ Import `axiosInstance` từ `@/lib/axios`
- ✅ Export object với các methods
- ✅ Async/await pattern
- ✅ Return `response.data` trực tiếp

---

### 5. Pattern: Yup Validation Schema

**File: `schemas/registerSchema.js`**

```javascript
import * as yup from "yup";

export const registerSchema = yup.object({
    // Pattern: CHỈ dùng .required() cho các field có debounce validation
    username: yup
        .string()
        .required("Vui lòng nhập tên hiển thị")
        .min(3, "Tên hiển thị phải có ít nhất 3 ký tự")
        .max(30, "Tên hiển thị không quá 30 ký tự")
        .matches(
            /^[a-zA-Z0-9_]+$/,
            "Tên hiển thị chỉ được chứa chữ cái, số và dấu gạch dưới"
        ),

    // Email: Chỉ required, không .email() vì dùng debounce validation
    email: yup.string().required("Vui lòng nhập email"),

    // Password: Chỉ required, không .min() vì dùng debounce validation
    password: yup.string().required("Vui lòng nhập mật khẩu"),

    password_confirmation: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu"),
});
```

**Lý do:**
- Validation format/length được handle bởi debounce functions
- Yup chỉ check `required` để tránh duplicate validation
- Error messages đẹp hơn từ debounce (sau 700ms thay vì instant)

---

### 6. Pattern: Validation Helpers

**File: `lib/utils.js`**

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Debounce helper
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Email validation: @ + domain + . + ít nhất 2 ký tự
export function isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

// Password validation: ít nhất 6 ký tự
export function isValidPassword(password) {
    return password && password.length >= 6;
}

// Password match
export function isPasswordMatch(password, confirmation) {
    return password === confirmation;
}
```

---

### 7. Pattern: Axios Instance

**File: `lib/axios.js`**

```javascript
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // 10 giây
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: Thêm token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Refresh token khi hết hạn
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
                    { refresh_token: refreshToken }
                );

                const newAccessToken = response.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
```

---

## 📝 Checklist cho Feature mới

Khi làm feature mới (ví dụ: LoginForm), làm theo thứ tự:

### Bước 1: Validation Schema
- [ ] Tạo file `schemas/[feature]Schema.js`
- [ ] Chỉ dùng `.required()` cho các field có debounce validation
- [ ] Dùng đầy đủ validation cho các field không cần debounce

### Bước 2: API Service
- [ ] Thêm methods vào `services/[feature]Service.js`
- [ ] Import `axiosInstance` từ `@/lib/axios`
- [ ] Return `response.data`

### Bước 3: Redux Slice (nếu cần)
- [ ] Thêm state: `[feature]Loading`, `[feature]Error`, `[feature]Success`
- [ ] Thêm actions: `[feature]Start`, `[feature]Success`, `[feature]Failure`
- [ ] Export selectors: `select[Feature]Loading`, etc.

### Bước 4: Component
- [ ] Tạo component trong `components/[Feature]Form/index.jsx`
- [ ] Setup React Hook Form với Yup resolver
- [ ] Implement debounce validation functions
- [ ] Implement submit handler với Redux
- [ ] Render UI với error states

### Bước 5: Testing
- [ ] Test debounce (700-1200ms)
- [ ] Test validation (format errors)
- [ ] Test API errors
- [ ] Test success flow
- [ ] Test loading states

---

## 🌐 API Endpoints

### Auth Endpoints
```
POST   /api/auth/register              - Đăng ký
POST   /api/auth/validate/username     - Check username tồn tại
POST   /api/auth/validate/email        - Check email tồn tại
POST   /api/auth/login                 - Đăng nhập
POST   /api/auth/refresh               - Refresh access token
POST   /api/auth/forgot-password       - Quên mật khẩu
```

### Request/Response Format

**Register Request:**
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "password_confirmation": "123456"
}
```

**Success Response:**
```json
{
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "user": {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com"
    }
}
```

**Error Response:**
```json
{
    "message": "Validation failed",
    "errors": {
        "email": ["Email đã tồn tại"],
        "username": ["Tên hiển thị đã được sử dụng"]
    }
}
```

---

## ⚙️ Environment Variables

**File: `.env`**
```env
VITE_API_BASE_URL=https://threads.f8team.dev
```

**Sử dụng:**
```javascript
const baseUrl = import.meta.env.VITE_API_BASE_URL;
```

**Lưu ý:**
- ⚠️ Biến phải có prefix `VITE_`
- ⚠️ Phải restart dev server sau khi thay đổi `.env`
- ⚠️ Không commit file `.env` lên Git

---

## ⏱️ Debounce Timing

| Field | Delay | Lý do |
|-------|-------|-------|
| Username | 700ms | Check API nhanh |
| Email | 1200ms | Validate format phức tạp hơn |
| Password | 700ms | Check format đơn giản |
| Confirm Password | 700ms | So sánh local, không gọi API |

---

## 🎨 UI/UX Patterns

### Input States

```javascript
// 1. Normal state
<Input className="h-12 bg-background border-input-border" />

// 2. Error state
<Input className="h-12 bg-background border-destructive" />

// 3. Disabled state
<Input disabled={isLoading} />
```

### Error Message Priority

```
1. Đang kiểm tra (isChecking) → "Đang kiểm tra..."
2. Lỗi format (formatError) → "Email không đúng định dạng"
3. Lỗi API (errors.field) → "Email đã tồn tại"
```

### Button States

```javascript
<Button
    type="submit"
    disabled={isLoading || isCheckingUsername || isCheckingEmail}
>
    {isLoading ? "Đang đăng ký..." : "Đăng ký"}
</Button>
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Debounce không hoạt động
**Nguyên nhân:** Yup validation chạy instant (mode: "onChange")
**Giải pháp:** Bỏ validation format khỏi Yup, chỉ giữ `.required()`

### Issue 2: Lỗi hiển thị 2 lần
**Nguyên nhân:** Cả Yup và debounce đều set error
**Giải pháp:** Dùng state riêng cho debounce error (`emailFormatError`)

### Issue 3: Axios timeout
**Nguyên nhân:** `timeout: 1000` quá ngắn
**Giải pháp:** Đổi thành `timeout: 10000` (10 giây)

### Issue 4: Password confirm không update khi đổi password
**Nguyên nhân:** Không lưu `passwordValue` để so sánh
**Giải pháp:** Thêm state `passwordValue` và update trong onChange

---

## 📚 Tech Stack Summary

| Công nghệ | Mục đích |
|-----------|----------|
| React 19 | UI Framework |
| React Hook Form | Form management |
| Yup | Validation schema |
| Redux Toolkit | State management |
| Axios | HTTP client |
| React Router | Routing |
| Tailwind CSS | Styling |
| Shadcn UI | UI components |
| Sonner | Toast notifications |

---

## 🚀 Next Steps - Lộ trình học tập

Khi làm feature mới, áp dụng patterns đã học theo thứ tự:

### Level 1: Cơ bản (Đã hoàn thành)
- ✅ **RegisterForm** - Form phức tạp với debounce validation (4 fields)

### Level 2: Trung bình
- [ ] **LoginForm** - Form đơn giản, không cần debounce (2 fields: email, password)
- [ ] **ForgotPasswordForm** - 1 field email với debounce validation

### Level 3: Nâng cao
- [ ] **ProfileForm** - Update user info với debounce validation
- [ ] **ChangePasswordForm** - 3 fields: old password, new password, confirm password

### Mỗi level học được gì?
- **Level 1:** Debounce, Redux, API validation, Complex form
- **Level 2:** Simplify code, Basic form handling
- **Level 3:** Reuse patterns, Advanced validation

---

## 💡 Tips cho người mới học

### Khi gõ code:
- ✅ **Đọc hiểu trước, gõ sau** - Hiểu logic trước khi gõ
- ✅ **Gõ từng file một** - Hoàn thành 1 file rồi mới chuyển file khác
- ✅ **Test ngay sau khi gõ** - Đừng gõ hết mới test
- ✅ **Debug bằng console.log** - Log ra để hiểu data flow
- ✅ **Đọc error messages** - Browser console và terminal

### Khi debug:
- 🔍 Check Redux DevTools để xem state changes
- 🔍 Check Network tab để xem API requests/responses
- 🔍 Console.log giá trị của state, props
- 🔍 Đọc error stack trace từ dưới lên

### Best practices:
- ✅ Luôn validate format trước khi gọi API
- ✅ Dùng debounce 700-1200ms tùy độ phức tạp
- ✅ Hiển thị "Đang kiểm tra..." khi call API
- ✅ Reset state khi component unmount
- ✅ Lưu tokens vào localStorage
- ✅ Hiển thị toast success/error
- ✅ Navigate sau khi thành công (2s delay)
- ✅ Disable button khi đang loading hoặc checking

### Common mistakes (Lỗi thường gặp):
- ❌ Quên `await` trước async function
- ❌ Quên `.unwrap()` khi dùng Redux Thunk (nhưng ta không dùng Thunk)
- ❌ **Import sai path** (nhớ dùng `@/` alias thay vì `../../../`)
- ❌ **Import không có `@`** → Lỗi `Module not found`
  ```javascript
  // ❌ SAI
  import { Button } from "components/ui/button";

  // ✅ ĐÚNG
  import { Button } from "@/components/ui/button";
  ```
- ❌ Quên thêm dependencies vào `useCallback` array
- ❌ State không update → Quên setState
- ❌ Infinite loop → useEffect thiếu dependencies
- ❌ **Thứ tự import lộn xộn** → Khó đọc, khó maintain

---

## 📖 Tài liệu tham khảo

Khi gặp khó khăn, tham khảo docs chính thức:

- [React Official Docs](https://react.dev) - Học Hooks, Components
- [React Hook Form](https://react-hook-form.com) - Form handling
- [Redux Toolkit](https://redux-toolkit.js.org) - State management
- [Axios](https://axios-http.com) - HTTP requests
- [Yup](https://github.com/jquense/yup) - Validation
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Shadcn UI](https://ui.shadcn.com) - UI components

---

## 🤝 Cách yêu cầu hỗ trợ

Khi cần giúp đỡ, hãy nói rõ:

### ✅ Cách hỏi TốT:
> "Làm LoginForm theo pattern trong CODE_PATTERNS.md. Form có 2 fields: email và password. Không cần debounce validation. API endpoint: POST /api/auth/login"

### ❌ Cách hỏi KHÔNG TỐT:
> "Làm login giúp tôi"

### Khi gặp lỗi:
Cung cấp đầy đủ thông tin:
1. File đang làm việc
2. Error message đầy đủ
3. Code đã thử
4. Kết quả mong đợi vs kết quả thực tế

---

**Tạo bởi:** Claude Code Assistant
**Dành cho:** Người mới học React
**Project:** Threads Clone - Learning Project
**Cập nhật:** 2025-01-26
**Version:** 1.0.0