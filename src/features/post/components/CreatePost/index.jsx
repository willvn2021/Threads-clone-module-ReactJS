import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { selectUser, selectIsAuthenticated } from "@/features/auth/authSlice";
import CreatePostModal from "../CreatePostModal";

const CreatePost = () => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Không hiển thị nếu chưa Authentication
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <>
            <div className="p-4 border-b border-border">
                <div className="flex gap-4 items-center">
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src={
                                user.avatar_url ||
                                "https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                            }
                        />
                        <AvatarFallback>
                            {user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 text-left px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                        <span className="text-muted-foreground">
                            {t("post.createPlaceholder")}
                        </span>
                    </button>
                </div>
            </div>

            <CreatePostModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    );
};

export default CreatePost;
