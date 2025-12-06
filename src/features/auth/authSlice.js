import axiosInstance from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";

//Init State
const initialState = {
    user: null,
    isAuthenticated: false, // Trạng thái đăng nhập
    loading: false,
    error: null, // Error message
    showSignUpModal: false, //Modal Sign
    isInitializing: true, // Đang kiểm tra token khi app khởi động

    //State Register
    registerLoading: false,
    registerError: null,
    registerSuccess: false,

    //State Login
    loginLoading: false,
    loginError: null,
    loginSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Action set loading
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        //Register actions
        registerStart: (state) => {
            state.registerLoading = true;
            state.registerError = null;
            state.registerSuccess = false;
        },
        registerSuccess: (state, action) => {
            state.registerLoading = false;
            state.registerSuccess = true;
            state.user = action.payload.user || null;
            state.registerError = null;
        },
        registerFailure: (state, action) => {
            state.registerLoading = false;
            state.registerError = action.payload;
            state.registerSuccess = false;
        },
        // Reset Register state
        resetRegisterState: (state) => {
            state.registerLoading = false;
            state.registerError = null;
            state.registerSuccess = false;
        },

        //Login actions
        loginStart: (state) => {
            state.loginLoading = true;
            state.loginError = null;
            state.loginSuccess = false;
        },
        loginSuccess: (state, action) => {
            state.loginLoading = false;
            state.loginSuccess = true;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isInitializing = false; // Đã xong khởi tạo
        },
        loginFailure: (state, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
            state.loginSuccess = false;
        },
        resetLoginState: (state) => {
            state.loginLoading = false;
            state.loginError = null;
            state.loginSuccess = false;
        },

        //Logout action
        logout: async () => {
            const response = await axiosInstance.post("/api/auth/logout");
            return response.data;
        },

        //Restore user từ localStorage khi app khởi động
        restoreUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.isInitializing = false; // Đã xong khởi tạo
        },

        //Hoàn tất khởi tạo (không có token hoặc token invalid)
        finishInitializing: (state) => {
            state.isInitializing = false;
        },

        //Action đóng/mở Modal
        toggleSignUpModal: (state, action) => {
            state.showSignUpModal = action.payload ?? !state.showSignUpModal;
        },
        //Action đóng modal
        closeSignUpModal: (state) => {
            state.showSignUpModal = false;
        },
    },
});

export const {
    setLoading,
    registerStart,
    registerSuccess,
    registerFailure,
    resetRegisterState,
    loginStart,
    loginSuccess,
    loginFailure,
    resetLoginState,
    logout,
    restoreUser,
    finishInitializing,
    toggleSignUpModal,
    closeSignUpModal,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectShowSignUpModal = (state) => state.auth.showSignUpModal;
export const selectRegisterLoading = (state) => state.auth.registerLoading;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectRegisterSuccess = (state) => state.auth.registerSuccess;
export const selectLoginLoading = (state) => state.auth.loginLoading;
export const selectLoginError = (state) => state.auth.loginError;
export const selectLoginSuccess = (state) => state.auth.loginSuccess;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectIsInitializing = (state) => state.auth.isInitializing;
