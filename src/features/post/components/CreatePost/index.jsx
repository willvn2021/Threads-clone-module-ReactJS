import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postService } from "../../services/postService";
import { addPost } from "@/features/feed/feedSlice";
import { toast } from "sonner";

const CreatePost = () => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    // Lấy user từ localStorage (nếu có)
    const user = JSON.parse(localStorage.getItem("user")) || {
        username: "guest",
        avatar: "",
    };

    const handlePost = async () => {
        if (!content.trim()) return;

        setIsPosting(true);
        try {
            const response = await postService.createPost({
                content,
                user: {
                    username: user.username,
                    avatar: user.avatar || "https://github.com/shadcn.png",
                },
            });

            if (response.success) {
                dispatch(addPost(response.data));
                setContent("");
                toast.success("Đã đăng bài viết mới");
            }
        } catch (error) {
            toast.error("Đăng bài thất bại");
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="p-4 border-b border-border">
            <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{user.username}</span>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Bắt đầu chuỗi mới..."
                        className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-foreground placeholder:text-foreground-tertiary min-h-[50px]"
                        disabled={isPosting}
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={handlePost}
                            disabled={!content.trim() || isPosting}
                            size="sm"
                            className="rounded-full px-4"
                        >
                            {isPosting ? "Đang đăng..." : "Đăng"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
