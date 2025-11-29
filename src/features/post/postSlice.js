import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPost: null, //Post đang dc xem chi tiết
    likedPosts: [], //Danh sách IDs của Post đã Like
    likesCount: {},
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        //Select post để xem chi tiết
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        //Toggle like post
        toggleLikeOptimistic: (state, action) => {
            const postId = action.payload;
            const index = state.likedPosts.indexOf(postId);

            if (index !== -1) {
                // Đã like -> unlike
                state.likedPosts.splice(index, 1);
                // Đảm bảo likesCount không bao giờ nhỏ hơn 0
                const currentCount = state.likesCount[postId] || 0;
                state.likesCount[postId] = Math.max(0, currentCount - 1);
            } else {
                // Chưa like -> like
                state.likedPosts.push(postId);
                // Đảm bảo khởi tạo đúng giá trị ban đầu
                const currentCount = state.likesCount[postId] || 0;
                state.likesCount[postId] = currentCount + 1;
            }

            // Lưu vào localStorage để persist khi F5 (optimistic update)
            try {
                localStorage.setItem("likedPosts", JSON.stringify(state.likedPosts));
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Error saving likedPosts to localStorage:", error);
                }
            }
        },

        syncLikeFromAPI: (state, action) => {
            const { postId, isLiked, likesCount } = action.payload;

            // Force sync với API response - đảm bảo state đúng với server
            const index = state.likedPosts.indexOf(postId);

            if (isLiked) {
                // API confirm là liked - đảm bảo có trong array
                if (index === -1) {
                    state.likedPosts.push(postId);
                }
            } else {
                // API confirm là không liked - đảm bảo không có trong array
                if (index !== -1) {
                    state.likedPosts.splice(index, 1);
                }
            }

            // Luôn cập nhật likesCount từ API
            state.likesCount[postId] = likesCount;

            // Lưu vào localStorage để persist khi F5
            try {
                localStorage.setItem("likedPosts", JSON.stringify(state.likedPosts));
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Error saving likedPosts to localStorage:", error);
                }
            }
        },

        //Trả lại state nếu API thất bại
        rollbackLike: (state, action) => {
            const { postId, wasLiked, oldCount } = action.payload;

            const index = state.likedPosts.indexOf(postId);

            if (wasLiked && index === -1) {
                state.likedPosts.push(postId);
            } else if (!wasLiked && index !== -1) {
                state.likedPosts.splice(index, 1);
            }

            //Khôi phục lại số lượng cũ
            state.likesCount[postId] = oldCount;
        },

        //Lấy số lượng likes ban đầu khi post load
        setInitialLikesCount: (state, action) => {
            const posts = action.payload;
            posts.forEach((post) => {
                state.likesCount[post.id] = post.likes_count;
            });
        },

        //Restore liked posts từ API response khi load feed
        restoreLikedPostsFromFeed: (state, action) => {
            const posts = action.payload;
            posts.forEach((post) => {
                // Nếu post có is_liked = true, thêm vào likedPosts
                if (post.is_liked && !state.likedPosts.includes(post.id)) {
                    state.likedPosts.push(post.id);
                }
                // Luôn khởi tạo likes count từ API khi load feed (để đảm bảo có giá trị ban đầu)
                // Nhưng không override nếu đã có giá trị và lớn hơn 0 (tránh override khi user đã like)
                if (post.likes_count !== undefined) {
                    const currentCount = state.likesCount[post.id];
                    // Chỉ update nếu chưa có hoặc giá trị từ API lớn hơn (để sync với server)
                    if (currentCount === undefined || currentCount === 0) {
                        state.likesCount[post.id] = post.likes_count;
                    }
                }
            });

            // Lưu vào localStorage sau khi restore
            try {
                localStorage.setItem("likedPosts", JSON.stringify(state.likedPosts));
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Error saving likedPosts to localStorage:", error);
                }
            }
        },

        //Restore liked posts từ localStorage khi app khởi động
        restoreLikedPostsFromStorage: (state) => {
            try {
                const savedLikedPosts = localStorage.getItem("likedPosts");
                if (savedLikedPosts) {
                    const likedPostsArray = JSON.parse(savedLikedPosts);
                    // Merge với likedPosts hiện tại (không duplicate)
                    likedPostsArray.forEach((postId) => {
                        if (!state.likedPosts.includes(postId)) {
                            state.likedPosts.push(postId);
                        }
                    });
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Error restoring likedPosts from localStorage:", error);
                }
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    selectPost,
    toggleLikeOptimistic,
    syncLikeFromAPI,
    rollbackLike,
    setInitialLikesCount,
    restoreLikedPostsFromFeed,
    restoreLikedPostsFromStorage,
    setLoading,
    setError,
} = postSlice.actions;

export default postSlice.reducer;

// Selectors
export const selectSelectedPost = (state) => state.post.selectedPost;
export const selectLikedPosts = (state) => state.post.likedPosts;
export const selectPostLoading = (state) => state.post.loading;
export const selectPostError = (state) => state.post.error;

// Selector lấy số lượng likes từ Redux
export const selectLikesCount = (postId) => (state) => {
    return state.post.likesCount[postId] || 0;
};

// Selector helper để check post đã được like chưa
export const isPostLiked = (postId) => (state) => {
    return state.post.likedPosts.includes(postId);
};
