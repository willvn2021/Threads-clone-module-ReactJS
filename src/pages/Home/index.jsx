import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import FeedHeader from "@/features/feed/components/FeedHeader";
import FeedList from "@/features/feed/components/FeedList";
import AuthCard from "@/features/auth/components/AuthCard";
import {
    setPosts,
    appendPosts,
    setLoading,
    setError,
    setHasMore,
    incrementPage,
} from "@/features/feed/feedSlice";
import {
    selectIsAuthenticated,
    selectIsInitializing,
} from "@/features/auth/authSlice";
import { postService } from "@/features/post/services/postService";
import {
    restoreLikedPostsFromFeed,
    restoreLikedPostsFromStorage,
} from "@/features/post/postSlice";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const HomePage = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.feed.posts);
    const loading = useSelector((state) => state.feed.loading);
    const hasMore = useSelector((state) => state.feed.hasMore);
    const currentPage = useSelector((state) => state.feed.page);

    // Kiểm tra user đã đăng nhập chưa
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInitializing = useSelector(selectIsInitializing);

    const [currentFeedType, setCurrentFeedType] = useState("for_you");

    // Restore liked posts từ localStorage khi component mount
    useEffect(() => {
        dispatch(restoreLikedPostsFromStorage());
    }, [dispatch]);

    // Fetch lần đầu Page 1 posts từ API
    useEffect(() => {
        const fetchInitialPosts = async () => {
            dispatch(setLoading(true));

            try {
                const response = await postService.getFeed(currentFeedType, 1);

                // Lấy data từ response
                const feedPosts = response.data || [];
                const pagination = response.pagination;

                dispatch(setPosts(feedPosts));
                // Restore liked posts từ API response
                dispatch(restoreLikedPostsFromFeed(feedPosts));

                //Check còn page không?
                if (pagination) {
                    const hasNextPage =
                        pagination.current_page < pagination.last_page;
                    dispatch(setHasMore(hasNextPage));
                }
            } catch (error) {
                console.error("Error fetching posts:", error);

                const errorMessage =
                    error.response?.data?.message ||
                    "Không thể tải bài viết. Vui lòng thử lại.";

                dispatch(setError(errorMessage));

                toast.error("Lỗi tải feed", {
                    description: errorMessage,
                });
            }
        };

        fetchInitialPosts();
    }, [dispatch, currentFeedType]);

    //Load post khi scroll đến cuối trang
    const fetchMorePosts = async () => {
        if (loading || !hasMore) return;

        dispatch(setLoading(true));

        try {
            const nextPage = currentPage + 1;
            const response = await postService.getFeed(
                currentFeedType,
                nextPage
            );

                const newPosts = response.data || [];
                const pagination = response.pagination;

                //Thêm post mới vào cuối danh sách
                dispatch(appendPosts(newPosts));
                // Restore liked posts từ API response cho posts mới
                dispatch(restoreLikedPostsFromFeed(newPosts));
                dispatch(incrementPage());

            //Check xem còn Page kế tiếp không?
            if (pagination) {
                const hasNextPage =
                    pagination.current_page < pagination.last_page;
                dispatch(setHasMore(hasNextPage));
            }
        } catch (error) {
            console.error("Error loading more posts:", error);

            const errorMessage =
                error.response?.data?.message || "Không thể tải thêm bài viết";

            dispatch(setError(errorMessage));
            toast.error("Lỗi tải thêm", {
                description: errorMessage,
            });
        }
    };

    const shouldShowAuthCard = !isAuthenticated && !isInitializing;
    const layoutMode =
        isInitializing || isAuthenticated ? "authenticated" : "unauthenticated";

    return (
        <div>
            <div
                className={cn(
                    "grid gap-4 grid-cols-1",
                    // Nếu đang khởi tạo hoặc đã đăng nhập: 1 cột (feed ở giữa)
                    // Nếu chưa đăng nhập: 2 cột (feed + auth card)
                    layoutMode === "authenticated"
                        ? "lg:grid-cols-1 lg:max-w-[720px] lg:mx-auto"
                        : "lg:grid-cols-[1fr_380px]"
                )}
            >
                {/* Feed Column - Left */}
                <div className="w-full relative">
                    <FeedHeader
                        currentFeedType={currentFeedType}
                        onFeedTypeChange={setCurrentFeedType}
                    />

                    {loading && posts.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-muted-foreground">
                                Đang tải...
                            </p>
                        </div>
                    ) : (
                        <FeedList
                            posts={posts}
                            fetchMorePosts={fetchMorePosts}
                            hasMore={hasMore}
                            loading={loading}
                        />
                    )}
                </div>

                {/* Auth Card Column - Right */}
                {shouldShowAuthCard && (
                    <aside className="hidden lg:block">
                        <AuthCard />
                    </aside>
                )}
            </div>
        </div>
    );
};
export default HomePage;
