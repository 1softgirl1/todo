tailwind.config = {
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        colors: {
            primary: "var(--color-primary)",
            secondary: "var(--color-secondary)",
            accent: "var(--color-accent)",
            "accent-hover": "var(--color-accent-hover)",
            "color-background": "var(--color-background)",
            "color-success": "var(--color-success)",
            "text-muted": "var(--color-text-muted)"
        },
        extend: {
            fontFamily: {
                custom: ["Inter", "sans-serif"],
            },
        },
    },
};