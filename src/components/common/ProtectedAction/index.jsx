import { useSelector, useDispatch } from "react-redux";
import { toggleSignUpModal } from "@/features/auth/authSlice";

const ProtectedAction = ({ children, onClick, ...props }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleClick = (e) => {
        if (!isAuthenticated) {
            //Nếu chưa đăng nhập thì hiện Modal
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleSignUpModal(true));
        } else {
            //Đăng nhập thì cho action click
            onClick?.(e);
        }
    };

    return (
        <div onClick={handleClick} {...props}>
            {children}
        </div>
    );
};
export default ProtectedAction;
