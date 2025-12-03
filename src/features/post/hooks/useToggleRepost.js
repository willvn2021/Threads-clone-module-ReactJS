import { useDispatch, useSelector } from "react-redux";
import {
    toggleRepostOptimistic,
    syncRepostFromAPI,
    rollbackRepost,
    isPostReposted,
    selectRepostsCount,
} from "../postSlice";
import { postService } from "../services/postService";
import { toast } from "sonner";

export const useToggleRepost = (postId) => {
    const dispatch = useDispatch();
    const isReposted = useSelector(isPostReposted(postId));
    const repostsCount = useSelector(selectRepostsCount(postId));

    const handleToggleRepost = async () => {
        const oldState = {
            wasReposted: isReposted,
            oldCount: repostsCount,
        };

        try {
            dispatch(toggleRepostOptimistic(postId));

            const response = await postService.repostPost(postId);
            if (import.meta.env.DEV) {
                console.log("Repost API response:", response);
                console.log("Old state wasReposted:", oldState.wasReposted);
            }

            //Đồng bộ API khi Response - CHỈ CẬP NHẬT COUNT, KHÔNG THAY ĐỔI STATE
            if (response.success && response.data) {
                // Chỉ sync count từ API, giữ nguyên isReposted từ optimistic update
                const newRepostsCount = response.data.reposts_and_quotes_count !== undefined
                    ? response.data.reposts_and_quotes_count
                    : (oldState.oldCount + (oldState.wasReposted ? -1 : 1));

                dispatch(
                    syncRepostFromAPI({
                        postId,
                        isReposted: !oldState.wasReposted, // Luôn sử dụng state sau toggle
                        repostsCount: newRepostsCount,
                    })
                );
            }
        } catch (error) {
            // Rollback nếu fail
            dispatch(
                rollbackRepost({
                    postId,
                    ...oldState,
                })
            );

            const errorMessage =
                error.response?.data?.message ||
                "Không thể repost bài viết. Vui lòng thử lại";
            toast.error(errorMessage);

            console.error("Toggle repost error:", error);
        }
    };
    return {
        isReposted,
        repostsCount,
        handleToggleRepost,
    };
};
