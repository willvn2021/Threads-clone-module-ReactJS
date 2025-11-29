import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "vi" ? "en" : "vi";
        i18n.changeLanguage(newLang);
    };

    const currentLanguage = i18n.language === "vi" ? "Tiếng Việt" : "English";

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleLanguage}
                        className="w-12 h-12 rounded-xl cursor-pointer hover:bg-[rgba(0,0,0,0.035)] hover:text-foreground dark:hover:bg-[#1d1d1d] transition-all duration-fast"
                    >
                        <Languages className="size-7" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="bg-foreground text-background font-medium"
                >
                    <p>{currentLanguage}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default LanguageSwitcher;
