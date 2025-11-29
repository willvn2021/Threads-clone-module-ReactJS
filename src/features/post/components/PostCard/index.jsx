import { useSelector, useDispatch } from "react-redux";
import ProtectedAction from "@/components/common/ProtectedAction";
import {
    Heart,
    MessageCircle,
    Repeat2,
    Send,
    MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToggleLike } from "@/features/post/hooks/useToggleLike";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const PostCard = ({ post, isLast, isFirst }) => {
    const dispatch = useDispatch();

    const {
        id,
        content,
        media_urls,
        created_at,
        likes_count: initialLikesCount,
        replies_count,
        reposts_and_quotes_count,
        user,
        original_post,
        is_quote,
    } = post;

    const { isLiked, likesCount, handleToggleLike } = useToggleLike(id);
    //Hiển thị giá trị likes từ Redux trước, sau đó fallback về giá trị thật từ API
    const displayLikesCount = likesCount > 0 ? likesCount : initialLikesCount;

    //Format time hiển thị
    const getTimeAgo = (timestamp) => {
        try {
            return formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                locale: vi,
            });
        } catch (error) {
            return timestamp;
        }
    };
    return (
        <>
            <Card
                className={cn(
                    "rounded-none border-0 shadow-none",
                    !isLast && "border-b border-border",
                    !isFirst && "border-t border-border"
                )}
            >
                <div className="px-4 sm:py-5 py-4">
                    <div className="flex gap-3">
                        {/* Avatar */}
                        <Avatar className="w-9 h-9 shrink-0">
                            <AvatarImage
                                src={user?.avatar_url}
                                alt={user?.username}
                            />
                            <AvatarFallback className="bg-secondary text-foreground">
                                {user?.username?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-semibold text-[15px] leading-5 text-foreground">
                                        {user?.username}
                                    </span>
                                    {user?.verified && (
                                        <svg
                                            className="w-3.5 h-3.5 text-blue-500"
                                            viewBox="0 0 22 22"
                                            fill="currentColor"
                                        >
                                            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                        </svg>
                                    )}
                                    <span className="text-muted-foreground text-[15px] leading-5">
                                        {getTimeAgo(created_at)}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "h-7 w-7 -mt-1 -mr-2 rounded-full shrink-0",
                                        "text-muted-foreground hover:text-foreground",
                                        "hover:bg-secondary transition-all"
                                    )}
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Post Content */}
                            <p className="text-[15px] leading-5 mb-2.5 whitespace-pre-wrap text-foreground">
                                {content}
                            </p>

                            {/* Images Grid */}
                            {media_urls && media_urls.length > 0 && (
                                <div
                                    className={cn(
                                        "grid gap-0.5 mb-3 rounded-md overflow-hidden border border-border",
                                        media_urls.length === 1 &&
                                            "grid-cols-1",
                                        media_urls.length === 2 &&
                                            "grid-cols-2",
                                        media_urls.length >= 3 && "grid-cols-2"
                                    )}
                                >
                                    {media_urls.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt=""
                                            className={cn(
                                                "w-full object-cover",
                                                media_urls.length === 1
                                                    ? "h-80 max-h-[500px]"
                                                    : "h-56"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Quote Post - Hiển thị original_post nếu is_quote = true */}
                            {is_quote && original_post && (
                                <div className="mb-3 border border-border rounded-xl p-3 bg-card/50">
                                    <div className="flex gap-2 items-start">
                                        <Avatar className="w-6 h-6 shrink-0">
                                            <AvatarImage
                                                src={
                                                    original_post.user
                                                        ?.avatar_url
                                                }
                                                alt={
                                                    original_post.user?.username
                                                }
                                            />
                                            <AvatarFallback className="bg-secondary text-foreground text-xs">
                                                {original_post.user?.username
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="font-semibold text-sm text-foreground">
                                                    {
                                                        original_post.user
                                                            ?.username
                                                    }
                                                </span>
                                                {original_post.user
                                                    ?.verified && (
                                                    <svg
                                                        className="w-3 h-3 text-blue-500"
                                                        viewBox="0 0 22 22"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-sm text-foreground-secondary line-clamp-3">
                                                {original_post.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Interaction Bar */}
                            <div className="flex items-center gap-0.5 -ml-2 mt-2">
                                {/* Like Button */}
                                <ProtectedAction onClick={handleToggleLike}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-9 gap-1.5 px-2.5 rounded-full transition-colors",
                                            isLiked
                                                ? "text-like hover:text-like/80"
                                                : "text-muted-foreground hover:text-foreground",
                                            "hover:bg-secondary"
                                        )}
                                    >
                                        <Heart
                                            className={cn(
                                                "size-5",
                                                isLiked && "fill-current"
                                            )}
                                        />
                                        {displayLikesCount > 0 && (
                                            <span className="text-sm font-normal">
                                                {displayLikesCount}
                                            </span>
                                        )}
                                    </Button>
                                </ProtectedAction>

                                {/* Comment Button */}
                                <ProtectedAction>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-9 gap-1.5 px-2.5 rounded-full transition-colors",
                                            "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        )}
                                    >
                                        <MessageCircle className="size-5" />
                                        {replies_count > 0 && (
                                            <span className="text-sm font-normal">
                                                {replies_count}
                                            </span>
                                        )}
                                    </Button>
                                </ProtectedAction>

                                {/* Repost Button */}
                                <ProtectedAction>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-9 gap-1.5 px-2.5 rounded-full transition-colors",
                                            "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        )}
                                    >
                                        <Repeat2 className="size-5" />
                                        {reposts_and_quotes_count > 0 && (
                                            <span className="text-sm font-normal">
                                                {reposts_and_quotes_count}
                                            </span>
                                        )}
                                    </Button>
                                </ProtectedAction>

                                {/* Share Button */}
                                <ProtectedAction>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-9 gap-1.5 px-2.5 rounded-full transition-colors",
                                            "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        )}
                                    >
                                        <Send className="size-5" />
                                    </Button>
                                </ProtectedAction>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};
export default PostCard;
