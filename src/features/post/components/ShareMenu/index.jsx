import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link2, Image, Code } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import CopyAsImageModal from "../CopyAsImageModal";
import EmbedModal from "../EmbedModal";

const ShareMenu = ({ post, children }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

    //Copy link handler
    const handleCopyLink = () => {
        const postUrl = `${window.location.origin}/${post.user.username}/post/${post.id}`;
        const success = copy(postUrl);

        if (success) {
            toast.success(t("post.share.linkCopied"));
        }
        setIsOpen(false);
    };

    //Copy as Image handler
    const handleCopyAsImage = () => {
        setIsOpen(false);
        setIsImageModalOpen(true);
    };

    //Get embed code handler
    const handleGetEmbedCode = () => {
        setIsOpen(false);
        setIsEmbedModalOpen(true);
    };

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>{children}</PopoverTrigger>
                <PopoverContent
                    className="w-56 p-1"
                    align="start"
                    side="bottom"
                >
                    <div className="flex flex-col gap-0.5">
                        {/* Copy Link */}
                        <Button
                            variant="ghost"
                            className="justify-start h-11 px-3 font-semibold text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
                            onClick={handleCopyLink}
                        >
                            <Link2 className="size-5 mr-2" />
                            {t("post.share.copyLink")}
                        </Button>

                        {/* Copy as Image */}
                        <Button
                            variant="ghost"
                            className="justify-start h-11 px-3 font-semibold text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
                            onClick={handleCopyAsImage}
                        >
                            <Image className="size-5 mr-2" />
                            {t("post.share.copyAsImage")}
                        </Button>

                        {/* Get Embed Code */}
                        <Button
                            variant="ghost"
                            className="justify-start h-11 px-3 font-semibold text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
                            onClick={handleGetEmbedCode}
                        >
                            <Code className="size-5 mr-2" />
                            {t("post.share.getEmbedCode")}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Modals */}
            <CopyAsImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                post={post}
            />

            <EmbedModal
                isOpen={isEmbedModalOpen}
                onClose={() => setIsEmbedModalOpen(false)}
                post={post}
            />
        </>
    );
};
export default ShareMenu;
