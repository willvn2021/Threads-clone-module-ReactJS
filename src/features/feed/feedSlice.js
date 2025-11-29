import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    hasMore: true, // Còn posts để load không (cho infinite scroll)
    page: 1, // Trang hiện tại
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        //Set danh sách post
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.page = 1; // Reset page về 1
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        //Tạo infinite scroll
        appendPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload];
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            (state.error = action.payload), (state.loading = false);
        },
        //Update khi có thay đổi (like, cmt)
        updatePost: (state, action) => {
            const index = state.posts.findIndex(
                (post) => post.id === action.payload.id
            );
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        //Đếm số page
        incrementPage: (state) => {
            state.page += 1;
        },
    },
});

export const {
    setPosts,
    addPost,
    appendPosts,
    setLoading,
    setError,
    updatePost,
    setHasMore,
    incrementPage,
} = feedSlice.actions;

export default feedSlice.reducer;

//Selector
export const selectPosts = (state) => state.feed.posts;
export const selectFeedLoading = (state) => state.feed.loading;
export const selectFeedError = (state) => state.feed.error;
export const selectHasMore = (state) => state.feed.hasMore;
export const selectPage = (state) => state.feed.page;
