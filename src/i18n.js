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
