import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

//Debounce
export function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

//Kiểm tra email có đúng format cơ bản
export function isValidEmailFormat(email) {
    //Regex: @ + domain + . ít nhất 2 ký tự
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

//Kiểm tra password có đủ độ dài tối thiểu
export function isValidPassword(password) {
    return password && password.length >= 6;
}

//Kiểm tra password confirmation khớp
export function isPasswordMatch(password, confirmation) {
    return password === confirmation;
}
