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
