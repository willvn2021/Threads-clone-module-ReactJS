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
