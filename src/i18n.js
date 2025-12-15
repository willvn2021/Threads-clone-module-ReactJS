import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                search: "Search",
                create: "Create",
                activity: "Activity",
                profile: "Profile",
                saved: "Saved",
            },
            theme: {
                light: "Light mode",
                dark: "Dark mode",
            },
            feed: {
                title: "Home",
            },
            menu: {
                tooltip: "Menu",
                appearance: "Appearance",
                insights: "Insights",
                settings: "Settings",
                feeds: "Feeds",
                saved: "Saved",
                liked: "Liked",
                report: "Report a problem",
                logout: "Log out",
            },
            auth: {
                notLoggedIn: "You are not logged in",
                logoutSuccess: "Logged out successfully!",
                logoutFailed: "Logout failed",
                loggingOut: "Logging out...",
            },
            post: {
                createPlaceholder: "What's new?",
                share: {
                    title: "Share",
                    copyLink: "Copy link",
                    copyAsImage: "Copy as image",
                    getEmbedCode: "Get embed code",
                    linkCopied: "Link copied to clipboard!",
                    imageCopied: "Image copied to clipboard!",
                    embedCopied: "Embed code copied!",
                    downloadImage: "Download",
                    copyImage: "Copy",
                    showMetrics: "Show metrics",
                    auto: "Auto",
                    embedTitle: "Embed post",
                    embedDescription:
                        "Preview of how this will look on your website",
                    copyCode: "Copy code",
                },
            },
        },
    },
    vi: {
        translation: {
            nav: {
                home: "Trang chủ",
                search: "Tìm kiếm",
                create: "Tạo mới",
                activity: "Hoạt động",
                profile: "Hồ sơ",
                saved: "Đã lưu",
            },
            theme: {
                light: "Chế độ sáng",
                dark: "Chế độ tối",
            },
            feed: {
                title: "Trang chủ",
            },
            menu: {
                tooltip: "Menu",
                appearance: "Appearance",
                insights: "Insights",
                settings: "Settings",
                feeds: "Feeds",
                saved: "Đã lưu",
                liked: "Liked",
                report: "Report a problem",
                logout: "Log out",
            },
            auth: {
                notLoggedIn: "Bạn chưa đăng nhập",
                logoutSuccess: "Đăng xuất thành công!",
                logoutFailed: "Đăng xuất thất bại",
                loggingOut: "Đang đăng xuất...",
            },
            post: {
                createPlaceholder: "Bạn đang nghĩ gì?",
                share: {
                    title: "Chia sẻ",
                    copyLink: "Sao chép liên kết",
                    copyAsImage: "Sao chép ảnh",
                    getEmbedCode: "Lấy mã nhúng",
                    linkCopied: "Đã sao chép liên kết!",
                    imageCopied: "Đã sao chép hình ảnh!",
                    embedCopied: "Đã sao chép mã nhúng!",
                    downloadImage: "Tải xuống",
                    copyImage: "Sao chép",
                    showMetrics: "Hiển thị số liệu",
                    auto: "Tự động",
                    embedTitle: "Nhúng bài viết",
                    embedDescription:
                        "Xem trước giao diện trên website của bạn",
                    copyCode: "Sao chép mã",
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "vi",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
