import axiosInstance from "@/lib/axios";

export const postService = {
    //Lấy feed posts
    getFeed: async (feedType = "for_you", page = 1) => {
        const response = await axiosInstance.get("/api/posts/feed", {
            params: {
                type: feedType,
                page: page,
            },
        });

        return response.data;
    },

    //Tạo post
    createPost: async (postData) => {
        const response = await axiosInstance.post("/api/posts", {
            content: postData.content,
            reply_permission: postData.reply_permission || "everyone",
            requires_reply_approval: postData.requires_reply_approval ? 1 : 0,
            is_ghost: postData.is_ghost ? 1 : 0,
        });

        return response.data;
    },

    //Toggle like post
    likePost: async (postId) => {
        const response = await axiosInstance.post(`/api/posts/${postId}/like`);
        return response.data;
    },

    repostPost: async (postId) => {
        const response = await axiosInstance.post(
            `/api/posts/${postId}/repost`
        );
        return response.data;
    },
};
