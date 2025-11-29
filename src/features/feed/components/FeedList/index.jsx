import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostCard from "@/features/post/components/PostCard";
import CreatePost from "@/features/post/components/CreatePost";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { setInitialLikesCount } from "@/features/post/postSlice";

const FeedList = ({ posts, fetchMorePosts, hasMore, loading }) => {
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [containerWidth, setContainerWidth] = useState(720);

    useEffect(() => {
        if (posts && posts.length > 0) {
            dispatch(setInitialLikesCount(posts));
        }
    }, [posts, dispatch]);

    useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setOffsetLeft(rect.left);
                setContainerWidth(rect.width);
            }
        };

        // Đảm bảo tính toán sau khi layout hoàn tất
        const timeoutId = setTimeout(updateOffset, 0);

        // Tính toán lại khi resize
        window.addEventListener("resize", updateOffset);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updateOffset);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <div
                className={cn(
                    "mt-[92px]", // Tăng từ 90px lên 92px để thấy được border-top
                    "mb-[50px]",
                    "bg-card shadow-sm",
                    "rounded-t-2xl",
                    "min-h-screen",
                    "border-l border-r border-t border-border" // Thêm border-top để hiển thị
                )}
            >
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={hasMore}
                    loader={
                        <div className="text-center py-6">
                            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Đang tải thêm...
                            </p>
                        </div>
                    }
                    endMessage={
                        posts.length > 0 && (
                            <div className="text-center py-6 text-sm text-muted-foreground">
                                Bạn đã xem hết tất cả bài viết
                            </div>
                        )
                    }
                >
                    {/* Create Post Input */}
                    <CreatePost />

                    {posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                isFirst={index === 0}
                                isLast={index === posts.length - 1}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            Chưa có bài viết nào
                        </div>
                    )}
                </InfiniteScroll>
            </div>

            {/* === BORDER DECORATION (Threads Style) === */}

            {/* Corner decoration wrapper - chỉ border top, left, right */}
            <div
                className="fixed z-[55] pointer-events-none overflow-hidden"
                style={{
                    left: `${offsetLeft}px`,
                    top: `${90 - 24}px`, // Điều chỉnh để match với FeedHeader height (90px)
                    width: `${containerWidth}px`,
                    height: "24px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    borderTop: "1px solid hsl(var(--border))",
                    borderLeft: "1px solid hsl(var(--border))",
                    borderRight: "1px solid hsl(var(--border))",
                }}
            />

            {/* === CHE GÓC BO TRÒN === */}
            {/* Các phần tử này sẽ bị che bởi FeedHeader khi cuộn (z-index 70) */}
            
            {/* Che góc trái - che phần border bo tròn bằng hình vuông với góc được cắt theo đường tròn 16px */}
            <div
                className="fixed z-[55] pointer-events-none"
                style={{
                    left: `${offsetLeft - 1}px`,
                    top: `${90 - 24}px`, // Điều chỉnh để match với FeedHeader height (90px)
                    width: "18px",
                    height: "18px",
                    background: "hsl(var(--background))",
                    clipPath:
                        "polygon(0 0, 18px 0, 0 18px, 0 16px, 2px 16px, 2px 2px, 16px 2px, 16px 0, 0 0)",
                }}
            />

            {/* Che góc phải - che phần border bo tròn bằng hình vuông với góc được cắt theo đường tròn 16px */}
            <div
                className="fixed z-[55] pointer-events-none"
                style={{
                    left: `${offsetLeft + containerWidth - 17}px`,
                    top: `${90 - 24}px`, // Điều chỉnh để match với FeedHeader height (90px)
                    width: "18px",
                    height: "18px",
                    background: "hsl(var(--background))",
                    clipPath:
                        "polygon(18px 0, 18px 18px, 0 0, 2px 0, 2px 16px, 16px 16px, 16px 2px, 18px 2px, 18px 0)",
                }}
            />
        </div>
    );
};
export default FeedList;
