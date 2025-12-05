import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FeedHeader = ({ currentFeedType, onFeedTypeChange, containerRef }) => {
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [width, setWidth] = useState(720);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!containerRef?.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setOffsetLeft(rect.left);
                setWidth(rect.width);
                setIsReady(true); // Đánh dấu đã sẵn sàng
            }
        };

        let resizeObserver = null;
        let timeoutId = null;

        // Dùng callback để đảm bảo element đã mount
        const checkAndUpdate = () => {
            if (containerRef.current) {
                // Đo ngay lập tức với double RAF để đảm bảo sau khi paint
                requestAnimationFrame(() => {
                    requestAnimationFrame(updateDimensions);
                });

                // Sau đó dùng ResizeObserver để theo dõi thay đổi
                resizeObserver = new ResizeObserver(() => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(updateDimensions);
                    });
                });

                resizeObserver.observe(containerRef.current);
                window.addEventListener("resize", updateDimensions);
            } else {
                // Nếu chưa mount, đợi một chút rồi thử lại
                timeoutId = setTimeout(checkAndUpdate, 10);
            }
        };

        // Đợi một chút để đảm bảo DOM đã render xong
        timeoutId = setTimeout(checkAndUpdate, 0);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (resizeObserver) resizeObserver.disconnect();
            window.removeEventListener("resize", updateDimensions);
        };
    }, [containerRef]);

    return (
        <>
            {/* Header fixed với overflow hidden để che border */}
            <header
                className="fixed top-0 h-[90px] z-[70] bg-background overflow-hidden "
                style={{
                    left: `${offsetLeft - 1}px`,
                    width: `${width + 2}px`,
                    opacity: isReady ? 1 : 0, // Ẩn cho đến khi ready
                }}
            >
                {/* Che góc dưới trái để match với FeedList rounded corner */}
                <div
                    className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-background"
                    style={{
                        left: "-1px",
                        borderBottomLeftRadius: "16px",
                    }}
                />

                {/* Che góc dưới phải để match với FeedList rounded corner - tăng kích thước để che hoàn toàn */}
                <div
                    className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-background/95"
                    style={{
                        right: "-1px",
                        borderBottomRightRadius: "16px",
                    }}
                />

                <div className="h-full flex items-center justify-center gap-8 px-6 relative z-10">
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
