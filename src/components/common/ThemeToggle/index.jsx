import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ThemeToggle = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Lấy theme từ localStorage hoặc mặc định là light
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle(
            "dark",
            savedTheme === "dark"
        );
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="w-12 h-12 rounded-xl cursor-pointer hover:text-foreground transition-all duration-fast hover:bg-[rgba(0,0,0,0.035)] dark:hover:bg-[#1d1d1d]"
                    >
                        {theme === "light" ? (
                            <Moon className="size-7" />
                        ) : (
                            <Sun className="size-7" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="bg-foreground text-background font-medium"
                >
                    <p>
                        {theme === "light" ? t("theme.dark") : t("theme.light")}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ThemeToggle;
