import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import store from "./app/store.js";
import router from "./routes";
import "./index.css";
import "./i18n.js";

function App() {
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
