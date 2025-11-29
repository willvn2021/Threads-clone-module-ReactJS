/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
        extend: {
            colors: {
                border: {
                    DEFAULT: "hsl(var(--border))",
                    hover: "hsl(var(--border-hover))",
                },
                input: {
                    DEFAULT: "hsl(var(--input))",
                    border: "hsl(var(--input-border))",
                },
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    secondary: "hsl(var(--background-secondary))",
                    tertiary: "hsl(var(--background-tertiary))",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                    secondary: "hsl(var(--foreground-secondary))",
                    tertiary: "hsl(var(--foreground-tertiary))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    hover: "hsl(var(--primary-hover))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    hover: "hsl(var(--secondary-hover))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    light: "hsl(var(--destructive-light))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    light: "hsl(var(--success-light))",
                    foreground: "hsl(var(--success-foreground))",
                },
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    light: "hsl(var(--warning-light))",
                    foreground: "hsl(var(--warning-foreground))",
                },
                info: {
                    DEFAULT: "hsl(var(--info))",
                    light: "hsl(var(--info-light))",
                    foreground: "hsl(var(--info-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    light: "hsl(var(--accent-light))",
                    foreground: "hsl(var(--accent-foreground))",
                    hover: "hsl(var(--accent-hover))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                    hover: "hsl(var(--card-hover))",
                    shadow: "hsl(var(--card-shadow))",
                },
                like: {
                    DEFAULT: "hsl(var(--like))",
                    light: "hsl(var(--like-light))",
                },
                verified: "hsl(var(--verified))",
                separator: "hsl(var(--separator))",
                overlay: "hsl(var(--overlay))",
                skeleton: {
                    DEFAULT: "hsl(var(--skeleton))",
                    shimmer: "hsl(var(--skeleton-shimmer))",
                },
            },
            boxShadow: {
                xs: "var(--shadow-xs)",
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
                xl: "var(--shadow-xl)",
                thread: "var(--shadow-thread)",
            },
            transitionDuration: {
                fast: "150ms",
                base: "200ms",
            },
            transitionTimingFunction: {
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
                spring: "cubic-bezier(0.16, 1, 0.3, 1)",
                bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                DEFAULT: "var(--radius)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                full: "var(--radius-full)",
            },
            spacing: {
                xs: "var(--spacing-xs)",
                sm: "var(--spacing-sm)",
                md: "var(--spacing-md)",
                lg: "var(--spacing-lg)",
                xl: "var(--spacing-xl)",
            },
            zIndex: {
                base: "var(--z-base)",
                dropdown: "var(--z-dropdown)",
                sticky: "var(--z-sticky)",
                fixed: "var(--z-fixed)",
                "modal-backdrop": "var(--z-modal-backdrop)",
                modal: "var(--z-modal)",
                popover: "var(--z-popover)",
                tooltip: "var(--z-tooltip)",
            },
            keyframes: {
                // Fade animations
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-down": {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                // Scale animations
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "scale-out": {
                    "0%": { opacity: "1", transform: "scale(1)" },
                    "100%": { opacity: "0", transform: "scale(0.95)" },
                },
                // Slide animations
                "slide-in-right": {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "slide-in-left": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "slide-in-up": {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                "slide-in-down": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                // Spin animations
                spin: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                // Pulse animations
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                // Bounce animations
                bounce: {
                    "0%, 100%": {
                        transform: "translateY(-25%)",
                        animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
                    },
                    "50%": {
                        transform: "translateY(0)",
                        animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
                    },
                },
                // Shimmer animation for skeleton loading
                shimmer: {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                // Heart beat animation for likes
                "heart-beat": {
                    "0%": { transform: "scale(1)" },
                    "14%": { transform: "scale(1.3)" },
                    "28%": { transform: "scale(1)" },
                    "42%": { transform: "scale(1.3)" },
                    "70%": { transform: "scale(1)" },
                },
                // Accordion animations
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                // Toast animations
                "toast-in": {
                    "0%": {
                        transform: "translateY(100%)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translateY(0)",
                        opacity: "1",
                    },
                },
                "toast-out": {
                    "0%": {
                        transform: "translateY(0)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "translateY(100%)",
                        opacity: "0",
                    },
                },
                // Threads-specific animations
                "thread-connect": {
                    "0%": { height: "0" },
                    "100%": { height: "100%" },
                },
                "reply-expand": {
                    "0%": {
                        opacity: "0",
                        transform: "scaleY(0)",
                        transformOrigin: "top",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scaleY(1)",
                        transformOrigin: "top",
                    },
                },
            },
            animation: {
                // Fade
                "fade-in": "fade-in 0.2s ease-out",
                "fade-out": "fade-out 0.2s ease-out",
                "fade-in-up": "fade-in-up 0.3s ease-out",
                "fade-in-down": "fade-in-down 0.3s ease-out",
                // Scale
                "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                "scale-out": "scale-out 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                // Slide
                "slide-in-right":
                    "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-in-left":
                    "slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-in-up": "slide-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-in-down":
                    "slide-in-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                // Spin & Pulse
                spin: "spin 1s linear infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                bounce: "bounce 1s infinite",
                // Shimmer
                shimmer: "shimmer 2s linear infinite",
                // Heart
                "heart-beat": "heart-beat 0.8s ease-in-out",
                // Accordion
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                // Toast
                "toast-in": "toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "toast-out": "toast-out 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                // Threads-specific
                "thread-connect": "thread-connect 0.3s ease-out",
                "reply-expand": "reply-expand 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};
