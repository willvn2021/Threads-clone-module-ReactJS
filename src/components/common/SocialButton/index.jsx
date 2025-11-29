import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SocialButton = ({
    icon: Icon,
    children,
    className,
    onClick,
    ...props
}) => {
    return (
        <Button
            onClick={onClick}
            className={cn(
                "w-full h-11 rounded-xl font-semibold",
                "bg-primary hover:bg-primary-hover",
                "text-primary-foreground",
                "transition-all duration-200",
                "flex items-center justify-center gap-2",
                "cursor-pointer",
                className
            )}
            {...props}
        >
            {Icon && <Icon className="size-5" />}
            <span>{children}</span>
        </Button>
    );
};

export default SocialButton;
