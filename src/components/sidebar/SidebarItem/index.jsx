import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignUpModal } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SidebarItem = ({
    icon: Icon,
    text,
    to,
    isActive = false,
    requireAuth = false,
}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleClick = (e) => {
        if (requireAuth && !isAuthenticated) {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleSignUpModal(true));
        }
    };

    const content = (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "w-20 h-14 transition-all text-foreground",
                            "hover:bg-[rgba(0,0,0,0.035)] hover:text-foreground dark:hover:bg-[#1d1d1d]",
                            isActive &&
                                "bg-[rgba(0,0,0,0.035)] text-foreground dark:bg-[#1d1d1d]"
                        )}
                        asChild
                    >
                        <Link to={to} onClick={handleClick}>
                            <Icon
                                className="size-7"
                                strokeWidth={isActive ? 2 : 1.5}
                            />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="bg-foreground text-background font-medium"
                >
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return content;
};

SidebarItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};

export default SidebarItem;
