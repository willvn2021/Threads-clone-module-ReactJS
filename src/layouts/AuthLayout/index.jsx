import { Outlet } from "react-router-dom";
import decorHeader from "@/assets/img/img-login.avif";

const AuthLayout = () => {
    return (
        <div>
            {/* Decor Header */}
            <div className="-mt-8 sm:-mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
                <img
                    src={decorHeader}
                    alt="Threads decorative header"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Content */}
            <div className="w-full max-w-sm sm:max-w-md -mt-8 sm:-mt-56">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="mt-12 sm:mt-16 text-center">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground-tertiary">
                    <span>© 2025</span>
                    <a href="#" className="hover:underline">
                        Điều khoản của Threads
                    </a>
                    <a href="#" className="hover:underline">
                        Chính sách quyền riêng tư
                    </a>
                    <a href="#" className="hover:underline">
                        Chính sách cookie
                    </a>
                    <a href="#" className="hover:underline">
                        Báo cáo sự cố
                    </a>
                </div>
            </footer>
        </div>
    );
};
export default AuthLayout;
