import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Image, Smile } from "lucide-react";

const QuoteModal = ({ isOpen, onClose, originalPost }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                {/* Header */}
                <DialogHeader className="px-4 py-3 border-b">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={onClose}
                        >
                            <x className="h-5 w-5" />
                        </Button>
                        <DialogTitle className="text-base font-semibold">
                            Quote
                        </DialogTitle>
                        <div className="w-8" />
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="px-4 py-4">
                    {/* Input User */}
                    <div className="flex gap-3 mb-4">
                        <Avatar className="w-10 h-10 shrink-0">
                            <AvatarImage
                                src="/placeholder-avatar.jpg"
                                alt="User"
                            />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Textarea
                                placeholder="Add a comment..."
                                className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-[15px]"
                            />

                            {/* Action icon */}
                            <div className="flex gap-1 mt-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                                >
                                    <Image className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                                >
                                    <Smile className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Original Post */}
                    {originalPost && (
                        <div className="border border-border rounded-xl p-3 bg-card/50">
                            <div className="flex gap-2 items-start">
                                <Avatar className="w-6 h-6 shrink-0">
                                    <AvatarImage
                                        src={originalPost.user?.avatar_url}
                                        alt={originalPost.user?.username}
                                    />
                                    <AvatarFallback className="bg-secondary text-foreground text-xs">
                                        {originalPost.user?.username
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="font-semibold text-sm text-foreground">
                                            {originalPost.user?.username}
                                        </span>
                                        {originalPost.user?.verified && (
                                            <svg
                                                className="w-3 h-3 text-blue-500"
                                                viewBox="0 0 22 22"
                                                fill="currentColor"
                                            >
                                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-sm text-foreground line-clamp-3">
                                        {originalPost.content}
                                    </p>
                                    {/* Show images */}
                                    {originalPost.media_urls &&
                                        originalPost.media_urls.length > 0 && (
                                            <div className="mt-2 grid grid-cols-2 gap-1 rounded-md overflow-hidden">
                                                {originalPost.media_urls
                                                    .slice(0, 2)
                                                    .map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt=""
                                                            className="w-full h-24 object-cover"
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t flex justify-end">
                    <Button className="rounded-full px-6 font-semibold" disable>
                        Quote
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default QuoteModal;
