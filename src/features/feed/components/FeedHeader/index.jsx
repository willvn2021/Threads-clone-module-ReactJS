import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FeedHeader = ({ currentFeedType, onFeedTypeChange }) => {
    const parentRef = useRef(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [width, setWidth] = useState(720);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const updateDimensions = () => {
            if (parentRef.current) {
                const rect = parentRef.current.getBoundingClientRect();
                setOffsetLeft(rect.left);
                setWidth(rect.width);
                setIsReady(true); // Đánh dấu đã sẵn sàng
            }
        };

        const timeoutId = setTimeout(updateDimensions, 0); // Tương tự fix FeedList
        window.addEventListener("resize", updateDimensions);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <>
            {/* Invisible reference div to measure parent width */}
            <div
                ref={parentRef}
                className="absolute top-0 w-full h-0 pointer-events-none"
            />

            {/* Header fixed với overflow hidden để che border */}
            <header
                className="fixed top-0 h-[90px] z-50 bg-background/95 backdrop-blur-md overflow-hidden"
                style={{
                    left: `${offsetLeft - 2}px`,
                    width: `${width + 4}px`,
                    opacity: isReady ? 1 : 0, // Ẩn cho đến khi ready
                }}
            >
                <div className="h-full flex items-center justify-center gap-8 px-6">
                    <button
                        onClick={() => onFeedTypeChange("for_you")}
                        className={cn(
                            "relative py-4 px-2 text-base font-semibold transition-colors",
                            currentFeedType === "for_you"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Dành cho bạn
                        {currentFeedType === "for_you" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => onFeedTypeChange("following")}
                        className={cn(
                            "relative py-4 px-2 text-base font-semibold transition-colors",
                            currentFeedType === "following"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Đang follow
                        {currentFeedType === "following" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
                        )}
                    </button>
                </div>
            </header>
        </>
    );
};
export default FeedHeader;
