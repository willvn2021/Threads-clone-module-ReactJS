import { useRef, useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SocialButton from "@/components/common/SocialButton";

const AuthCard = () => {
    const parentRef = useRef(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const updatePosition = () => {
            if (parentRef.current) {
                const rect = parentRef.current.getBoundingClientRect();
                setOffsetLeft(rect.left);
                setIsReady(true);
            }
        };

        const timeoutId = setTimeout(updatePosition, 0);
        window.addEventListener("resize", updatePosition);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return (
        <>
            {/* Reference div */}
            <div
                ref={parentRef}
                className="absolute top-0 w-full h-0 pointer-events-none"
            />

            {/* Fixed AuthCard */}
            <div
                className="fixed top-[90px] w-[380px]"
                style={{
                    left: `${offsetLeft}px`,
                    opacity: isReady ? 1 : 0,
                }}
            >
                <Card
                    className={cn(
                        "rounded-2xl border border-border",
                        "bg-card shadow-sm overflow-hidden"
                    )}
                >
                    {/* Nội dung giữ nguyên */}
                    <div className="px-6 py-6 text-center">
                        <h2 className="text-base font-semibold text-foreground mb-2">
                            Đăng nhập hoặc đăng ký Threads
                        </h2>
                        <p className="text-sm text-muted-foreground leading-5">
                            Xem mọi người đang nói về điều gì và tham gia cuộc
                            trò chuyện.
                        </p>
                    </div>

                    <div className="px-6 pb-4">
                        <SocialButton icon={Instagram}>
                            Tiếp tục bằng Instagram
                        </SocialButton>
                    </div>

                    <div className="px-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-border" />
                        <span>hoặc</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="pb-3">
                        <Link
                            to="/login"
                            className="text-sm text-center flex justify-center text-muted-foreground hover:text-foreground transition-colors leading-5"
                        >
                            Đăng nhập bằng tên người dùng
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
};
export default AuthCard;
