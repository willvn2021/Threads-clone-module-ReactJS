import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import feedReducer from "@/features/feed/feedSlice";
import postReducer from "@/features/post/postSlice";

//Cấu hình Redux Store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer, // State quản lý danh sách Post
        post: postReducer, //State của post action (like, cmt, etc)
    },
});

export default store;
