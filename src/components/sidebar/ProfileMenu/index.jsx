import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/features/auth/services/authService";
import { logout as logoutAction } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProfileMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    //Hàm xử lý logout
    const handleLogout = async () => {
        if (!isAuthenticated) {
            toast.error(t("auth.notLoggedIn") || "Bạn chưa đăng nhập");
            return;
        }

        setIsLoggingOut(true);

        try {
            await authService.logout();

            //Xóa token và data user khỏi localStorage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            dispatch(logoutAction());

            toast.success(t("auth.logoutSuccess") || "Đăng xuất thành công !");

            setIsOpen(false);
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            console.error("Logout failed:", error);

            //Chắc cú API lỗi thì vẫn clear hết local data
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            dispatch(logoutAction());

            toast.error(
                error.response?.data?.message ||
                    t("auth.logoutFailed") ||
                    "Đăng xuất thất bại"
            );

            setTimeout(() => {
                navigate("/login");
            }, 500);
        } finally {
            setIsLoggingOut(false);
        }
    };

    //Menu placeholder
    const menuItems = [
        {
            label: t("menu.appearance") || "Appearance",
            hasChevron: true,
            onClick: () => console.log("Appearance clicked"),
        },
        {
            label: t("menu.insights") || "Insights",
            onClick: () => console.log("Insights clicked"),
        },
        {
            label: t("menu.settings") || "Settings",
            onClick: () => console.log("Settings clicked"),
        },
    ];

    const secondaryMenuItems = [
        {
            label: t("menu.feeds") || "Feeds",
            hasChevron: true,
            onClick: () => console.log("Feeds clicked"),
        },
        {
            label: t("menu.saved") || "Saved",
            onClick: () => console.log("Saved clicked"),
        },
        {
            label: t("menu.liked") || "Liked",
            onClick: () => console.log("Liked clicked"),
        },
    ];

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "w-20 h-14 transition-all text-foreground",
                                    "hover:bg-[rgba(0,0,0,0.035)] hover:text-foreground dark:hover:bg-[#1d1d1d] cursor-pointer",
                                    isOpen &&
                                        "bg-[rgba(0,0,0,0.035)] text-foreground dark:bg-[#1d1d1d]"
                                )}
                            >
                                <Menu className="size-7" strokeWidth={1.5} />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent
                        side="right"
                        className="bg-foreground text-background font-medium"
                    >
                        <p>{t("menu.tooltip") || "Menu"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <PopoverContent
                side="top"
                align="start"
                className="w-64 p-0 bg-background border border-border shadow-lg rounded-2xl"
                sideOffset={8}
            >
                <div className="py-2">
                    {/* Primary menu items */}
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors text-left cursor-pointer"
                        >
                            <span className="text-sm font-medium text-foreground">
                                {item.label}
                            </span>
                            {item.hasChevron && (
                                <ChevronRight className="size-4 text-muted-foreground" />
                            )}
                        </button>
                    ))}

                    <Separator className="my-2" />

                    {/* Secondary menu items */}
                    {secondaryMenuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors text-left cursor-pointer"
                        >
                            <span className="text-sm font-medium text-foreground">
                                {item.label}
                            </span>
                            {item.hasChevron && (
                                <ChevronRight className="size-4 text-muted-foreground" />
                            )}
                        </button>
                    ))}

                    <Separator className="my-2" />

                    {/* Report a problem  */}
                    <button
                        onClick={() => console.log("Report clicked")}
                        className="w-full px-4 py-3 hover:bg-accent transition-colors text-left cursor-pointer"
                    >
                        <span className="text-sm font-medium text-foreground ">
                            {t("menu.report") || "Report a problem"}
                        </span>
                    </button>

                    {/* Logout btn */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full px-4 py-3 hover:bg-accent transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <span className="text-sm font-medium text-red-600 dark:text-red-500">
                                {isLoggingOut
                                    ? t("auth.loggingOut") ||
                                      "Đang đăng xuất..."
                                    : t("menu.logout") || "Log out"}
                            </span>
                        </button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
export default ProfileMenu;
