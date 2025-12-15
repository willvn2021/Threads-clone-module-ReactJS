import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

const EmbedModal = ({ isOpen, onClose, post }) => {
    const { t } = useTranslation();

    // Generate embed code
    const embedUrl = `${window.location.origin}/${post.user.username}/post/${post.id}/embed`;
    const embedCode = `<blockquote class="text-post-media" data-text-post-permalink="${embedUrl}"><a href="${embedUrl}"></a></blockquote><script async src="${window.location.origin}/embed.js"></script>`;

    // Copy embed code
    const handleCopyCode = () => {
        const success = copy(embedCode);
        if (success) {
            toast.success(t("post.share.embedCopied"));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{t("post.share.embedTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("post.share.embedDescription")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Preview */}
                    <div className="border rounded-lg p-4 bg-secondary/30">
                        <div className="text-sm text-muted-foreground mb-2">
                            Preview (iframe will be implemented later)
                        </div>
                        <div className="aspect-video bg-muted rounded flex items-center justify-center">
                            <p className="text-muted-foreground">
                                Iframe preview: {embedUrl}
                            </p>
                        </div>
                    </div>

                    {/* Embed Code */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Embed Code
                        </label>
                        <div className="relative">
                            <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
                                <code>{embedCode}</code>
                            </pre>
                            <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2"
                                onClick={handleCopyCode}
                            >
                                <Copy className="size-4 mr-1" />
                                {t("post.share.copyCode")}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmbedModal;
