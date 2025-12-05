import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postService } from "../../services/postService";
import { addPost } from "@/features/feed/feedSlice";
import { toast } from "sonner";
import { selectUser } from "@/features/auth/authSlice";
import { ImageIcon, SmileIcon } from "lucide-react";

const CreatePostModal = ({ open, onOpenChange }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [replyPermission, setReplyPermission] = useState("everyone");
    const [requiresApproval, setRequiresApproval] = useState(false);

    const handlePost = async () => {
        if (!content.trim()) return;

        setIsPosting(true);
        try {
            const response = await postService.createPost({
                content,
                reply_permission: replyPermission,
                requires_reply_approval: requiresApproval,
                is_ghost: false,
            });

            if (response.success) {
                dispatch(addPost(response.data));
                setContent("");
                setReplyPermission("everyone");
                setRequiresApproval(false);
                onOpenChange(false);
                toast.success("Đã đăng bài viết mới");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng bài thất bại");
        } finally {
            setIsPosting(false);
        }
    };

    const handleCancel = () => {
        setContent("");
        setReplyPermission("everyone");
        setReplyPermission(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[600px] p-0"
                showCloseButton={false}
            >
                {/* Header */}
                <DialogHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isPosting}
                    >
                        Cancel
                    </Button>
                    <DialogTitle className="text-center" flex-1>
                        New thread
                    </DialogTitle>
                    <div className="w-16"></div>
                </DialogHeader>

                {/* Body */}
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    <div className="flex gap-3">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                            <AvatarImage
                                src={
                                    user?.avatar_url ||
                                    "https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                                }
                            />
                            <AvatarFallback>
                                {user?.username?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                            <div className="font-semibold text-sm">
                                {user?.username}
                            </div>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Bạn muốn viết gì?"
                                className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-foreground placeholder:text-muted-foreground min-h-[100px] focus:outline-none"
                                disabled={isPosting}
                                autoFocus
                            />

                            <div className="flex gap-2 text-muted-foreground">
                                <button className="hover:text-foreground transition-colors">
                                    <ImageIcon className="size-5" />
                                </button>
                                <button className="hover:text-foreground transition-colors">
                                    <SmileIcon className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reply Options */}
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium">
                                Reply option
                            </span>
                        </div>

                        <div className="space-y-2">
                            {/* Who can reply */}
                            <button
                                onClick={() => {
                                    const options = [
                                        "everyone",
                                        "your_followers",
                                        "mentioned",
                                    ];
                                    const currentIndex =
                                        options.indexOf(replyPermission);
                                    const nextIndex =
                                        (currentIndex + 1) % options.length;
                                    setReplyPermission(options[nextIndex]);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                                disabled={isPosting}
                            >
                                <div className="text-sm">
                                    Who can reply and quote
                                </div>
                                <div className="text-xs text-muted-foreground capitalize">
                                    {replyPermission.replace("_", " ")}
                                </div>
                            </button>

                            {/* Review and  approve replies*/}
                            <button
                                onClick={() =>
                                    setRequiresApproval(!requiresApproval)
                                }
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                                disabled={isPosting}
                            >
                                <div className="text-sm">
                                    Review and approve replies
                                </div>
                                <div
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        requiresApproval
                                            ? "bg-primary"
                                            : "bg-muted"
                                    }`}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                                            requiresApproval
                                                ? "translate-x-6"
                                                : "translate-x-0.5"
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <Button
                        onClick={handlePost}
                        disabled={!content.trim() || isPosting}
                        className="w-full rounded-full"
                    >
                        {isPosting ? "Posting..." : "Post"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default CreatePostModal;
