# SocialButton Component

Component button có thể tái sử dụng cho các nút đăng nhập mạng xã hội.

## Cách sử dụng

### Import
```jsx
import SocialButton from "@/components/common/SocialButton";
import { Instagram, Facebook, Mail } from "lucide-react";
```

### Ví dụ cơ bản
```jsx
<SocialButton icon={Instagram}>
    Tiếp tục bằng Instagram
</SocialButton>
```

### Với custom className
```jsx
<SocialButton
    icon={Facebook}
    className="bg-blue-600 hover:bg-blue-700"
>
    Đăng nhập bằng Facebook
</SocialButton>
```

### Với onClick handler
```jsx
<SocialButton
    icon={Mail}
    onClick={() => console.log('Email login')}
>
    Đăng nhập bằng Email
</SocialButton>
```

### Không có icon
```jsx
<SocialButton>
    Đăng ký ngay
</SocialButton>
```

## Props

| Prop | Type | Required | Mô tả |
|------|------|----------|-------|
| `icon` | Component | No | Icon component từ lucide-react |
| `children` | ReactNode | Yes | Nội dung text của button |
| `className` | string | No | Custom CSS classes (sẽ merge với styles mặc định) |
| `onClick` | function | No | Handler khi click button |
| `...props` | any | No | Các props khác sẽ được pass vào Button component |

## Styling

Component sử dụng Tailwind CSS và có thể override styles thông qua `className` prop nhờ hàm `cn()` từ `@/lib/utils`.