# Prompt Guide - Cách yêu cầu hỗ trợ hiệu quả

> **Hướng dẫn viết prompt để Claude Code hiểu đúng ý bạn**
>
> Document này giúp bạn học cách giao tiếp hiệu quả với Claude Code Assistant.
> Từ các yêu cầu đơn giản đến phức tạp.

---

## 📖 Mục lục

1. [Nguyên tắc viết prompt tốt](#nguyên-tắc-viết-prompt-tốt)
2. [Cấp độ 1: Prompt đơn giản](#cấp-độ-1-prompt-đơn-giản)
3. [Cấp độ 2: Prompt chi tiết](#cấp-độ-2-prompt-chi-tiết)
4. [Cấp độ 3: Prompt phức tạp](#cấp-độ-3-prompt-phức-tạp)
5. [Các tình huống thực tế](#các-tình-huống-thực-tế)
6. [Anti-patterns (Tránh)](#anti-patterns-tránh)

---

## Nguyên tắc viết prompt tốt

### ✅ 5 yếu tố của prompt tốt:

1. **Rõ ràng** - Nói rõ bạn muốn gì
2. **Cụ thể** - Đưa ra chi tiết, không mơ hồ
3. **Có context** - Tham chiếu đến file, pattern đã có
4. **Có ví dụ** - Đưa ví dụ nếu cần
5. **Ngắn gọn** - Không dài dòng, đi thẳng vào vấn đề

### ❌ 5 lỗi thường gặp:

1. **Quá mơ hồ** - "Làm login giúp tôi"
2. **Thiếu context** - Không nói rõ đang ở file nào
3. **Không có yêu cầu rõ ràng** - "Code này có vấn đề"
4. **Quá dài dòng** - Viết cả trang không có trọng tâm
5. **Không có thông tin lỗi** - "Lỗi rồi giúp tôi"

---

## Cấp độ 1: Prompt đơn giản

### 1.1. Tạo file/component mới

#### ❌ KHÔNG TỐT:
```
Làm login
```

#### ✅ TỐT:
```
Làm LoginForm theo pattern trong CODE_PATTERNS.md.
Form có 2 fields: username và password.
Không cần debounce validation.
API endpoint: POST /api/auth/login
```

**Tại sao tốt?**
- ✅ Nói rõ feature: LoginForm
- ✅ Tham chiếu pattern: CODE_PATTERNS.md
- ✅ Liệt kê fields cụ thể
- ✅ Nói rõ không cần debounce
- ✅ Đưa API endpoint

---

### 1.2. Sửa lỗi đơn giản

#### ❌ KHÔNG TỐT:
```
Lỗi rồi
```

#### ✅ TỐT:
```
File RegisterForm.jsx dòng 150 báo lỗi:
"Cannot read property 'data' of undefined"

Đang ở hàm onSubmit, sau khi gọi authService.register()
```

**Tại sao tốt?**
- ✅ Nói rõ file và dòng
- ✅ Copy error message đầy đủ
- ✅ Nói rõ context (hàm nào, sau thao tác gì)

---

### 1.3. Giải thích code

#### ❌ KHÔNG TỐT:
```
Giải thích code này
```

#### ✅ TỐT:
```
Giải thích hàm checkEmail ở RegisterForm.jsx dòng 77-108.

Tôi muốn hiểu:
- Tại sao dùng debounce?
- Tại sao phải check format trước?
- setEmailFormatError làm gì?
```

**Tại sao tốt?**
- ✅ Chỉ rõ hàm và vị trí
- ✅ Liệt kê câu hỏi cụ thể
- ✅ Focus vào điểm chưa hiểu

---

## Cấp độ 2: Prompt chi tiết

### 2.1. Thêm feature mới

#### ❌ KHÔNG TỐT:
```
Thêm chức năng forgot password
```

#### ✅ TỐT:
```
Làm ForgotPasswordForm theo pattern trong CODE_PATTERNS.md.

Requirements:
- 1 field: email (có debounce validation)
- Validate email format trước khi submit
- API: POST /api/auth/forgot-password
- Success: Hiển thị toast "Đã gửi link reset password vào email"
- Error: Hiển thị lỗi từ API
- Sau success, redirect về /login sau 3s

Redux:
- Tạo forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure
- Thêm state: forgotPasswordLoading, forgotPasswordError

Files cần:
- schemas/forgotPasswordSchema.js
- components/ForgotPasswordForm/index.jsx
- Cập nhật authSlice.js
- Cập nhật authService.js
```

**Tại sao tốt?**
- ✅ Tham chiếu pattern rõ ràng
- ✅ Liệt kê đầy đủ requirements
- ✅ Nói rõ flow: validate → API → toast → redirect
- ✅ Chi tiết Redux actions cần tạo
- ✅ List files cần tạo/update

---

### 2.2. Debug lỗi phức tạp

#### ❌ KHÔNG TỐT:
```
Form không submit được
```

#### ✅ TỐT:
```
RegisterForm không submit được khi click button "Đăng ký".

Hiện tượng:
- Click button không có phản ứng
- Console không có error
- Network tab không có request

Đã thử:
- Check handleSubmit có đúng không → Có
- Check button disabled → Không disabled
- Log data trong onSubmit → Không log ra

Code hiện tại:
- File: RegisterForm/index.jsx
- Dòng 147-199: hàm onSubmit
- Dòng 340-346: button submit

Bạn cần:
- File RegisterForm/index.jsx
- Check xem vấn đề ở đâu
```

**Tại sao tốt?**
- ✅ Mô tả hiện tượng chi tiết
- ✅ Liệt kê những gì đã thử
- ✅ Cho biết code ở đâu
- ✅ Nói rõ cần gì

---

### 2.3. Refactor code

#### ❌ KHÔNG TỐT:
```
Code này dài quá, sửa giúp tôi
```

#### ✅ TỐT:
```
RegisterForm/index.jsx có 350 dòng, quá dài.

Tôi muốn tách:
- Các hàm debounce validation ra custom hook: useFormValidation
- Hook trả về: checkUsername, checkEmail, checkPassword, isCheckingUsername, isCheckingEmail

Giữ nguyên:
- Component logic
- Redux integration
- Form submission

Pattern:
- Tham khảo CODE_PATTERNS.md section "Custom Hook"
- Hook ở: src/features/auth/hooks/useFormValidation.js
```

**Tại sao tốt?**
- ✅ Nói rõ vấn đề: file quá dài
- ✅ Đưa ra giải pháp cụ thể: tách hook
- ✅ Liệt kê những gì cần tách
- ✅ Nói rõ những gì giữ nguyên
- ✅ Tham chiếu pattern

---

## Cấp độ 3: Prompt phức tạp

### 3.1. Feature phức tạp với nhiều files

#### ✅ PROMPT CHUẨN:
```
Làm feature User Profile Edit theo pattern CODE_PATTERNS.md.

## Overview
User có thể edit profile: avatar, username, bio, email

## Requirements

### UI/UX:
1. ProfileEditForm có 4 sections:
   - Avatar upload (preview trước khi upload)
   - Username (debounce check unique)
   - Bio (textarea, max 160 chars)
   - Email (debounce check + verify mới)

2. Validation:
   - Username: min 3, max 30, regex /^[a-zA-Z0-9_]+$/
   - Bio: max 160 chars
   - Email: format email + debounce check

3. Flow:
   - Avatar: Upload → Preview → Crop (optional) → Submit
   - Username: Gõ → Debounce 700ms → Check API → Show available/taken
   - Email thay đổi: Gửi verify email → User verify → Update
   - Submit: Validate all → API → Toast → Refresh data

### API Endpoints:
- GET /api/user/profile → Lấy data hiện tại
- POST /api/user/profile/avatar → Upload avatar
- PUT /api/user/profile → Update profile
- POST /api/user/email/verify → Gửi email verify

### Redux State:
```javascript
profileEditLoading: false,
profileEditError: null,
profileEditSuccess: false,
avatarUploading: false,
avatarUrl: null,
```

### Files Structure:
```
features/profile/
├── components/
│   ├── ProfileEditForm/index.jsx
│   ├── AvatarUpload/index.jsx
│   └── BioTextarea/index.jsx
├── services/
│   └── profileService.js
├── schemas/
│   └── profileEditSchema.js
├── hooks/
│   └── useAvatarUpload.js
└── profileSlice.js
```

### Specific Notes:
- Dùng react-dropzone cho avatar upload
- Crop avatar dùng react-easy-crop
- Bio counter: 0/160 ở góc phải textarea
- Disable submit khi: uploading avatar, checking username/email
- Toast: "Cập nhật thành công" hoặc error từ API
```

**Tại sao TỐT HƠN?**
- ✅ Structure rõ ràng với headers
- ✅ Chia sections: UI/UX, API, Redux, Files
- ✅ Chi tiết flow từng feature
- ✅ Đưa code structure mong muốn
- ✅ Notes về libraries cụ thể
- ✅ Edge cases: disable button, loading states

---

### 3.2. Debug issue phức tạp

#### ✅ PROMPT CHUẨN:
```
RegisterForm có memory leak khi unmount.

## Hiện tượng:
- Warning: "Can't perform a React state update on an unmounted component"
- Xuất hiện khi: Gõ email → Click back browser trước khi API về
- Console error:
```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
```

## Context:
- File: RegisterForm/index.jsx
- Dòng 77-108: checkEmail function với debounce
- Dòng 92: setIsCheckingEmail(true)
- Dòng 104: setIsCheckingEmail(false) ← Lỗi ở đây

## Root cause tôi nghĩ:
- Debounce callback vẫn chạy sau khi component unmount
- setState trên unmounted component → Warning

## Đã thử:
1. Thêm cleanup trong useEffect:
```javascript
useEffect(() => {
    return () => {
        dispatch(resetRegisterState());
    };
}, [dispatch]);
```
→ Vẫn lỗi

2. Thêm isMounted flag:
```javascript
const isMounted = useRef(true);
useEffect(() => {
    return () => { isMounted.current = false; };
}, []);
```
→ Không biết dùng ở đâu trong debounce

## Cần giải pháp:
- Cleanup debounce callbacks khi unmount
- Prevent setState trên unmounted component
- Pattern đúng cho trường hợp này
```

**Tại sao XUẤT SẮC?**
- ✅ Mô tả hiện tượng chi tiết
- ✅ Copy error message đầy đủ
- ✅ Chỉ rõ context code
- ✅ Phân tích root cause
- ✅ Liệt kê những gì đã thử + kết quả
- ✅ Nói rõ cần giải pháp gì

---

## Các tình huống thực tế

### Tình huống 1: Học một pattern mới

#### ✅ PROMPT:
```
Tôi thấy RegisterForm dùng debounce validation.
Giải thích pattern này cho người mới học React:

1. Tại sao dùng debounce? (không dùng onChange thông thường?)
2. Flow hoạt động từng bước
3. Khi nào NÊN dùng pattern này?
4. Khi nào KHÔNG NÊN dùng?

Dùng code từ RegisterForm/index.jsx dòng 77-108 làm ví dụ.
Giải thích đơn giản, dễ hiểu.
```

---

### Tình huống 2: So sánh 2 cách làm

#### ✅ PROMPT:
```
So sánh 2 cách handle form validation:

Cách 1: Yup validation instant (RegisterForm cũ)
Cách 2: Debounce validation (RegisterForm hiện tại)

Cho tôi bảng so sánh:
| Tiêu chí | Yup instant | Debounce |
|----------|-------------|----------|
| Performance | ? | ? |
| UX | ? | ? |
| Code complexity | ? | ? |
| Khi nào dùng | ? | ? |

Thêm code example cho mỗi cách.
```

---

### Tình huống 3: Optimize performance

#### ✅ PROMPT:
```
RegisterForm render 5 lần khi gõ 1 ký tự vào email.

Profiler React DevTools:
- EmailInput: 5 renders
- RegisterForm: 5 renders
- Trigger: onChange → checkEmail → setEmailFormatError

Cần optimize để giảm rerenders.

Đề xuất của tôi:
- Dùng useMemo cho validation functions?
- Tách EmailInput ra component riêng + React.memo?
- Dùng useCallback đúng cách?

Hướng dẫn tôi cách nào TỐT NHẤT và tại sao.
Cho code example.
```

---

### Tình huống 4: Test code

#### ✅ PROMPT:
```
Viết unit tests cho checkEmail function ở RegisterForm.

Test cases cần cover:
1. Empty email → Không gọi API
2. Invalid format (test@) → Set emailFormatError
3. Valid format (test@gmail.com) → Gọi API
4. API success → Clear errors
5. API error → Set error
6. Debounce 700ms → Chỉ gọi API 1 lần

Framework: Jest + React Testing Library
File test: RegisterForm.test.jsx

Pattern theo CODE_PATTERNS.md nếu có.
```

---

## Anti-patterns (Tránh)

### ❌ Anti-pattern 1: Quá chung chung

**BAD:**
```
Làm login giúp tôi
```

**WHY BAD:**
- Không biết cần gì: UI? Logic? API?
- Không biết theo pattern nào
- Không biết fields, validation rules

**FIX → Cụ thể hóa:**
```
Làm LoginForm theo pattern RegisterForm.
2 fields: username, password.
API: POST /api/auth/login
```

---

### ❌ Anti-pattern 2: Không có context

**BAD:**
```
Lỗi này sửa sao?
[Paste 100 dòng code]
```

**WHY BAD:**
- Không biết lỗi gì
- Không biết code ở file nào
- Không biết đã thử gì

**FIX → Thêm context:**
```
File: RegisterForm.jsx, dòng 150
Error: "Cannot read property 'data' of undefined"
Context: Sau khi gọi authService.register()
Đã thử: Check response structure → Response trả về ok
```

---

### ❌ Anti-pattern 3: Hỏi nhiều thứ cùng lúc

**BAD:**
```
1. Làm login
2. Sửa lỗi register
3. Thêm forgot password
4. Optimize performance
5. Viết tests
```

**WHY BAD:**
- Quá nhiều tasks
- Không có priority
- Khó focus

**FIX → Chia nhỏ, ưu tiên:**
```
Làm LoginForm trước (ưu tiên cao nhất).
Sau đó sẽ làm tiếp: forgot password, tests.
```

---

### ❌ Anti-pattern 4: Không đọc docs/patterns có sẵn

**BAD:**
```
Làm form đăng ký như thế nào?
[Trong khi CODE_PATTERNS.md đã có hướng dẫn chi tiết]
```

**WHY BAD:**
- Duplicate effort
- Không theo chuẩn project

**FIX → Tham chiếu docs:**
```
Làm LoginForm theo pattern trong CODE_PATTERNS.md.
Khác biệt: Không cần debounce validation.
```

---

## 📊 Template tổng hợp

### Template 1: Tạo feature mới
```
Làm [FeatureName] theo pattern trong CODE_PATTERNS.md.

Requirements:
- [Requirement 1]
- [Requirement 2]

API:
- [Method] [Endpoint] - [Description]

Redux (nếu cần):
- State: [list states]
- Actions: [list actions]

Files:
- [File 1]
- [File 2]

Notes:
- [Special note 1]
```

### Template 2: Debug lỗi
```
[Component/File] có lỗi [tên lỗi].

Hiện tượng:
- [Mô tả chi tiết]

Error message:
```
[Copy error đầy đủ]
```

Context:
- File: [path]
- Dòng: [line numbers]
- Hàm: [function name]

Đã thử:
1. [Solution 1] → [Kết quả]
2. [Solution 2] → [Kết quả]

Cần:
- [What you need]
```

### Template 3: Hỏi giải thích
```
Giải thích [concept/code] cho người mới học React.

Code reference:
- File: [path]
- Dòng: [line numbers]

Tôi muốn hiểu:
1. [Question 1]
2. [Question 2]

Với ví dụ đơn giản, dễ hiểu.
```

---

## 🎯 Checklist trước khi hỏi

- [ ] Đã đọc CODE_PATTERNS.md chưa?
- [ ] Đã thử tự debug chưa?
- [ ] Đã search error message chưa?
- [ ] Prompt có rõ ràng không?
- [ ] Có đủ context không?
- [ ] Có copy error đầy đủ không?

---

## 💡 Tips cuối cùng

1. **Càng cụ thể càng tốt** - Chi tiết > Chung chung
2. **Tham chiếu patterns** - CODE_PATTERNS.md là bạn
3. **Copy error đầy đủ** - Đừng paraphrase error
4. **Chia nhỏ tasks** - 1 prompt 1 task
5. **Show code** - Dễ hiểu hơn lời nói
6. **Feedback** - Nếu answer không đúng ý, nói rõ thiếu gì

---

**Ví dụ tốt nhất từ conversation này:**

> "Làm LoginForm theo pattern trong CODE_PATTERNS.md. Form có 2 fields: email và password. Không cần debounce validation. API endpoint: POST /api/auth/login"

→ Rõ ràng, cụ thể, có context, ngắn gọn! ✨

---

**Tạo bởi:** Claude Code Assistant
**Mục đích:** Giúp giao tiếp hiệu quả hơn
**Cập nhật:** 2025-01-26
**Version:** 1.0.0