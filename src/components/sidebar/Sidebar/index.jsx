import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Home, Search, Heart, User, Plus, Pin } from "lucide-react";
import Logo from "@/components/common/Logo";
import SidebarItem from "@/components/sidebar/SidebarItem";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";

const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();

    //Danh sách menu Items
    const menuItems = [
        {
            icon: Home,
            text: t("nav.home"),
            to: "/",
            path: "/",
        },
        {
            icon: Search,
            text: t("nav.search"),
            to: "/search",
            path: "/search",
        },
        {
            icon: Plus,
            text: t("nav.create"),
            to: "/create",
            path: "/create",
            requireAuth: true,
        },
        {
            icon: Heart,
            text: t("nav.activity"),
            to: "/activity",
            path: "/activity",
            requireAuth: true,
        },
        {
            icon: User,
            text: t("nav.profile"),
            to: "/profile",
            path: "/profile",
            requireAuth: true,
        },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-26 bg-background flex flex-col items-center py-6">
            {/* Logo */}
            <div className="mb-20 w-10 h-10">
                <Logo />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col gap-4 items-center justify-center">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        icon={item.icon}
                        text={item.text}
                        to={item.to}
                        isActive={location.pathname === item.path}
                        requireAuth={item.requireAuth}
                    />
                ))}
            </nav>

            {/* Secondary Actions Group */}
            <div className="flex flex-col gap-2 items-center mb-15">
                <SidebarItem
                    icon={Pin}
                    text={t("nav.saved")}
                    to={"/saved"}
                    isActive={location.pathname === "/saved"}
                    requireAuth={true}
                />
            </div>

            {/* Language Switcher - Bottom */}
            <div className="flex flex-col gap-3 items-center">
                <ThemeToggle />
                <LanguageSwitcher />
            </div>
        </aside>
    );
};
export default Sidebar;
