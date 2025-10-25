interface ThemeToggle {
    initialize: () => boolean;
    setTheme: (theme: 'light' | 'dark') => void;
    getTheme: () => 'light' | 'dark';
}

declare global {
    interface Window {
        themeToggle: ThemeToggle;
    }
}

const THEME_KEY = 'readnest-theme';
const THEME_ATTRIBUTE = 'data-theme';

class ThemeManager {
    private currentTheme: 'light' | 'dark';

    constructor() {
        this.currentTheme = this.loadTheme();
    }

    private loadTheme(): 'light' | 'dark' {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    private saveTheme(theme: 'light' | 'dark'): void {
        localStorage.setItem(THEME_KEY, theme);
    }

    private applyTheme(theme: 'light' | 'dark'): void {
        const html = document.documentElement;

        html.setAttribute(THEME_ATTRIBUTE, theme);

        html.classList.add('theme-transitioning');

        setTimeout(() => {
            html.classList.remove('theme-transitioning');
        }, 300);

        this.currentTheme = theme;
    }

    public initialize(): boolean {
        this.applyTheme(this.currentTheme);

        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        return this.currentTheme === 'dark';
    }

    public setTheme(theme: 'light' | 'dark'): void {
        this.applyTheme(theme);
        this.saveTheme(theme);

        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    public getTheme(): 'light' | 'dark' {
        return this.currentTheme;
    }

    public toggle(): void {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

const themeManager = new ThemeManager();

window.themeToggle = {
    initialize: () => themeManager.initialize(),
    setTheme: (theme: 'light' | 'dark') => themeManager.setTheme(theme),
    getTheme: () => themeManager.getTheme()
};

const style = document.createElement('style');
style.textContent = `
    html.theme-transitioning,
    html.theme-transitioning *,
    html.theme-transitioning *::before,
    html.theme-transitioning *::after {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild(style);