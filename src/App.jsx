import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import store from "./app/store.js";
import router from "./routes";
import {
    restoreLikedPostsFromStorage,
    restoreRepostedPostsFromStorage
} from "./features/post/postSlice";
import "./index.css";
import "./i18n.js";

function App() {
    useEffect(() => {
        // Restore liked và reposted posts từ localStorage khi app khởi động
        store.dispatch(restoreLikedPostsFromStorage());
        store.dispatch(restoreRepostedPostsFromStorage());
    }, []);

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
                <Toaster position="top-center" richColors closeButton />
            </Provider>
        </>
    );
}

export default App;
