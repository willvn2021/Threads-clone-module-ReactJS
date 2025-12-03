import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPost: null, //Post đang dc xem chi tiết
    likedPosts: [], //Danh sách IDs của Post đã Like
    likesCount: {},
    repostedPosts: [],
    repostsCount: {},
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
                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify(state.likedPosts)
                );
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error saving likedPosts to localStorage:",
                        error
                    );
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
                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify(state.likedPosts)
                );
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error saving likedPosts to localStorage:",
                        error
                    );
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

        // Repost Reducers
        toggleRepostOptimistic: (state, action) => {
            const postId = action.payload;
            const index = state.repostedPosts.indexOf(postId);

            if (index !== -1) {
                //Đã repost thì unrepost
                state.repostedPosts.splice(index, 1);
                const currentCount = state.repostsCount[postId] || 0;
                state.repostsCount[postId] = Math.max(0, currentCount - 1);
            } else {
                // Chưa repost chuyển repost
                state.repostedPosts.push(postId);
                const currentCount = state.repostsCount[postId] || 0;
                state.repostsCount[postId] = currentCount + 1;
            }

            try {
                localStorage.setItem(
                    "repostedPosts",
                    JSON.stringify(state.repostedPosts)
                );
            } catch (error) {
                console.error(
                    "Error saving repostedPosts to localStorage:",
                    error
                );
            }
        },

        syncRepostFromAPI: (state, action) => {
            const { postId, isReposted, repostsCount } = action.payload;
            const index = state.repostedPosts.indexOf(postId);

            if (isReposted) {
                if (index === -1) {
                    state.repostedPosts.push(postId);
                }
            } else {
                if (index !== -1) {
                    state.repostedPosts.splice(index, 1);
                }
            }

            state.repostsCount[postId] = repostsCount;

            try {
                localStorage.setItem(
                    "repostedPosts",
                    JSON.stringify(state.repostedPosts)
                );
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error saving repostedPosts to localStorage:",
                        error
                    );
                }
            }
        },

        rollbackRepost: (state, action) => {
            const { postId, wasReposted, oldCount } = action.payload;
            const index = state.repostedPosts.indexOf(postId);

            if (wasReposted && index === -1) {
                state.repostedPosts.push(postId);
            } else if (!wasReposted && index !== -1) {
                state.repostedPosts.splice(index, 1);
            }

            state.repostsCount[postId] = oldCount;
        },

        //Lấy số lượng likes ban đầu khi post load
        setInitialLikesCount: (state, action) => {
            const posts = action.payload;
            posts.forEach((post) => {
                // Chỉ set nếu chưa có giá trị trong Redux (tránh override optimistic update)
                if (state.likesCount[post.id] === undefined) {
                    state.likesCount[post.id] = post.likes_count;
                }
            });
        },

        //Thêm init reposts count
        setInitialRepostsCount: (state, action) => {
            const posts = action.payload;
            posts.forEach((post) => {
                // Chỉ set nếu chưa có giá trị trong Redux (tránh override optimistic update)
                if (state.repostsCount[post.id] === undefined) {
                    state.repostsCount[post.id] =
                        post.reposts_and_quotes_count || 0;
                }
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
                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify(state.likedPosts)
                );
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error saving likedPosts to localStorage:",
                        error
                    );
                }
            }
        },

        //restore reposted posts từ feed
        restoreRepostedPostsFromFeed: (state, action) => {
            const posts = action.payload;
            posts.forEach((post) => {
                // Debug log để check API response
                if (import.meta.env.DEV && post.is_reposted) {
                    console.log(
                        `[DEBUG] Post ${post.id} is_reposted:`,
                        post.is_reposted
                    );
                }

                if (
                    post.is_reposted &&
                    !state.repostedPosts.includes(post.id)
                ) {
                    state.repostedPosts.push(post.id);
                }
                if (post.reposts_and_quotes_count !== undefined) {
                    const currentCount = state.repostsCount[post.id];
                    if (currentCount === undefined || currentCount === 0) {
                        state.repostsCount[post.id] =
                            post.reposts_and_quotes_count;
                    }
                }
            });

            // Debug log sau khi restore
            if (import.meta.env.DEV) {
                console.log(
                    "[DEBUG] Reposted posts after restore:",
                    state.repostedPosts
                );
            }

            try {
                localStorage.setItem(
                    "repostedPosts",
                    JSON.stringify(state.repostedPosts)
                );
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error saving repostedPosts to localStorage:",
                        error
                    );
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
                    console.error(
                        "Error restoring likedPosts from localStorage:",
                        error
                    );
                }
            }
        },

        //restore reposted posts từ localStorage
        restoreRepostedPostsFromStorage: (state) => {
            try {
                const savedRepostedPosts =
                    localStorage.getItem("repostedPosts");

                if (savedRepostedPosts) {
                    const repostedPostsArray = JSON.parse(savedRepostedPosts);
                    repostedPostsArray.forEach((postId) => {
                        if (!state.repostedPosts.includes(postId)) {
                            state.repostedPosts.push(postId);
                        }
                    });
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error(
                        "Error restoring repostedPosts from localStorage:",
                        error
                    );
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
    toggleRepostOptimistic,
    syncRepostFromAPI,
    rollbackRepost,
    setInitialLikesCount,
    setInitialRepostsCount,
    restoreLikedPostsFromFeed,
    restoreRepostedPostsFromFeed,
    restoreLikedPostsFromStorage,
    restoreRepostedPostsFromStorage,
    setLoading,
    setError,
} = postSlice.actions;

export default postSlice.reducer;

// Selectors
export const selectSelectedPost = (state) => state.post.selectedPost;
export const selectLikedPosts = (state) => state.post.likedPosts;
export const selectRepostedPosts = (state) => state.post.repostedPosts;
export const selectPostLoading = (state) => state.post.loading;
export const selectPostError = (state) => state.post.error;

// Selector lấy số lượng likes từ Redux
export const selectLikesCount = (postId) => (state) => {
    return state.post.likesCount[postId] || 0;
};

// Selector lấy số lượng reposts từ Redux
export const selectRepostsCount = (postId) => (state) => {
    return state.post.repostsCount[postId] || 0;
};

// Selector helper để check post đã được like chưa
export const isPostLiked = (postId) => (state) => {
    return state.post.likedPosts.includes(postId);
};

// Selector helper để check post đã được repost chưa
export const isPostReposted = (postId) => (state) => {
    return state.post.repostedPosts.includes(postId);
};
