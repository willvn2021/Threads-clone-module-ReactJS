import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toPng } from "html-to-image";
import { Download, Copy, Sun, Moon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";

const CopyAsImageModal = ({ isOpen, onClose, post }) => {
    const { t, i18n } = useTranslation();
    const [showMetrics, setShowMetrics] = useState(true);
    const [theme, setTheme] = useState("auto");
    const imageRef = useRef(null);

    const {
        id,
        content,
        media_urls,
        created_at,
        likes_count,
        replies_count,
        reposts_and_quotes_count,
        user,
    } = post;

    //Format time
    const getTimeAgo = (timestamp) => {
        try {
            const locale = i18n.language === "vi" ? vi : enUS;
            return formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                locale,
            });
        } catch {
            return timestamp;
        }
    };

    //Theme
    const getCurrentTheme = () => {
        if (theme === "auto") {
            return document.documentElement.classList.contains("dark")
                ? "dark"
                : "light";
        }

        return theme;
    };

    //Download Image
    const handleDownload = async () => {
        if (!imageRef.current) return;

        try {
            const dataUrl = await toPng(imageRef.current, {
                cacheBust: true,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = `threads-post-${id}.png`;
            link.href = dataUrl;
            link.click();

            toast.success(t("post.share.downloadImage"));
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to download image");
        }
    };

    //Copy Image to Clipboard
    const handleCopyImage = async () => {
        if (!imageRef.current) return;

        try {
            const dataUrl = await toPng(imageRef.current, {
                cacheBust: true,
                pixelRatio: 2,
            });

            // Convert data URL to blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            //Copy to clipboard
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
            ]);

            toast.success(t("post.share.imageCopied"));
        } catch (error) {
            console.error("Error copying image:", error);
            toast.error("Failed to copy image");
        }
    };

    const currentTheme = getCurrentTheme();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto sm:w-3xl">
                <DialogHeader>
                    <DialogTitle>{t("post.share.copyAsImage")}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Controls */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Show Metrics Toggle */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showMetrics"
                                checked={showMetrics}
                                onChange={(e) =>
                                    setShowMetrics(e.target.checked)
                                }
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <label
                                htmlFor="showMetrics"
                                className="text-sm font-medium cursor-pointer"
                            >
                                {t("post.share.showMetrics")}
                            </label>
                        </div>

                        {/* Theme Toggle */}
                        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                            <Button
                                size="sm"
                                variant={
                                    theme === "light" ? "default" : "ghost"
                                }
                                className="h-8 px-3"
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="size-4 mr-1" />
                                Light
                            </Button>
                            <Button
                                size="sm"
                                variant={theme === "dark" ? "default" : "ghost"}
                                className="h-8 px-3"
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="size-4 mr-1" />
                                Dark
                            </Button>
                            <Button
                                size="sm"
                                variant={theme === "auto" ? "default" : "ghost"}
                                className="h-8 px-3"
                                onClick={() => setTheme("auto")}
                            >
                                {t("post.share.auto")}
                            </Button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div
                        ref={imageRef}
                        className={cn(
                            "border rounded-xl p-6 mx-auto max-w-lg",
                            currentTheme === "dark"
                                ? "bg-black text-white border-gray-800"
                                : "bg-white text-black border-gray-200"
                        )}
                    >
                        <div className="flex gap-3">
                            {/* Avatar */}
                            <Avatar className="w-10 h-10 shrink-0">
                                <AvatarImage
                                    src={user?.avatar_url}
                                    alt={user?.username}
                                />
                                <AvatarFallback
                                    className={cn(
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white"
                                            : "bg-gray-200 text-black"
                                    )}
                                >
                                    {user?.username?.charAt(0).toUpperCase() ||
                                        "U"}
                                </AvatarFallback>
                            </Avatar>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-[15px]">
                                        {user?.username}
                                    </span>
                                    {user?.verified && (
                                        <svg
                                            className="w-4 h-4 text-blue-500"
                                            viewBox="0 0 22 22"
                                            fill="currentColor"
                                        >
                                            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                        </svg>
                                    )}
                                    <span
                                        className={cn(
                                            "text-sm",
                                            currentTheme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-600"
                                        )}
                                    >
                                        {getTimeAgo(created_at)}
                                    </span>
                                </div>
                                {/* Post Content */}
                                <p className="text-[15px] leading-6 mb-3 whitespace-pre-wrap">
                                    {content}
                                </p>
                                {/* Images */}
                                {media_urls && media_urls.length > 0 && (
                                    <div
                                        className={cn(
                                            "grid gap-1 mb-3 rounded-lg overflow-hidden",
                                            currentTheme === "dark"
                                                ? "border border-gray-800"
                                                : "border border-gray-200",
                                            media_urls.length === 1 &&
                                                "grid-cols-1",
                                            media_urls.length === 2 &&
                                                "grid-cols-2",
                                            media_urls.length >= 3 &&
                                                "grid-cols-2"
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
                                                        ? "h-64"
                                                        : "h-40"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}
                                {/* Metrics */}
                                {showMetrics && (
                                    <div
                                        className={cn(
                                            "flex items-center gap-4 text-sm pt-2 border-t",
                                            currentTheme === "dark"
                                                ? "border-gray-800 text-gray-400"
                                                : "border-gray-200 text-gray-600"
                                        )}
                                    >
                                        {likes_count > 0 && (
                                            <span>{likes_count} likes</span>
                                        )}
                                        {replies_count > 0 && (
                                            <span>{replies_count} replies</span>
                                        )}
                                        {reposts_and_quotes_count > 0 && (
                                            <span>
                                                {reposts_and_quotes_count}{" "}
                                                reposts
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Threads Logo */}
                        <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-800">
                            <svg
                                className={cn(
                                    "w-6 h-6",
                                    currentTheme === "dark"
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                )}
                                viewBox="0 0 192 192"
                                fill="currentColor"
                            >
                                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
                            </svg>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={handleDownload}>
                            <Download className="size-4 mr-2" />
                            {t("post.share.downloadImage")}
                        </Button>
                        <Button onClick={handleCopyImage}>
                            <Copy className="size-4 mr-2" />
                            {t("post.share.copyImage")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default CopyAsImageModal;
